---
title: おうち Hyper-V Server
permalink: home_hyper-v
date: 2022-02-20
# thumb: images/2020-01-05-thumb.png
category: Diary
tag:
  - Hyper-V
  - devops
---

## 注意

- GUI はない
- リモート管理が前提
- おうちで使ってみる場合、インストールメディア(USB メモリ)に一緒に WindowsAdminCenter の MSI を保存 → そのままインストール
  - ブラウザから設定が一番楽ではないか

## 参考

## 準備物

- 公式 ISO
  https://www.microsoft.com/ja-jp/evalcenter/evaluate-hyper-v-server-2019

## インストール

普通のインストールと同じであるちょっとだけスクリーンショットを

## OpenSSH Server for Windows を有効化する

https://docs.microsoft.com/ja-jp/windows-server/administration/openssh/openssh_install_firstuse

```
> Get-WindowsCapability -Online | Where-Object Name -Like "OpenSSH*"
> Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
Path          :
Online        : True
RestartNeeded : False

> Start-Service sshd
> Set-Service -Name sshd -StartupType 'Automatic'

# 確認
> Get-NetFirewallRule -Name "OpenSSH*"
# 作成と有効化(とりあえずデフォルトで有効になっている模様)
> New-NetFirewallRule -Name 'OpenSSH-Server-In-TCP' -DisplayName 'OpenSSH Server (sshd)' -Enabled True -Direction Inbound -Protocol TCP -Action Allow -LocalPort 22

# C:\ProgramData\ssh\sshd_configをnotepadで編集する(CLIで使えるテキストエディタが無いのでRemoteDesktopでアクセス)
# 下を追記してRootLoginを禁止する
DenyUsers administrator
# DenyGroups Administratorsはどうなのかな・・・

> Restart-Service sshd

# 公開鍵認証も追加すればいける
> mkdir .ssh
> echo ssh-ed25519 HOGEHOGE >> .ssh/authorized_keys

# sshd_configにAdministratorsグループに対する設定があるので注意
# Match Group administrators
#       AuthorizedKeysFile __PROGRAMDATA__/ssh/administrators_authorized_keys
# 手順
> echo ssh-ed25519 HOGEHOGE >> >> %PROGRAMDATA%\ssh\administrators_authorized_keys
> icacls.exe "C:\ProgramData\ssh\administrators_authorized_keys" /inheritance:r /grant "Administrators:F" /grant "SYSTEM:F"

```

## WinRM で異なるセグメントからの操作を許可する

```
> Get-NetFirewallRule -Name "WinRM*"
> Get-NetFirewallRule -Name "WinRM*" | Get-NetFirewallAddressFilter
> Get-NetFirewallRule -Name "WINRM-HTTP-IN-TCP-PUBLIC" | Get-NetFirewallAddressFilter

LocalAddress  : Any
RemoteAddress : LocalSubnet
> Set-NetFirewallRule -Name "WINRM-HTTP-In-TCP-PUBLIC" -RemoteAddress LocalSubnet,192.168.10.0/24
```

## Windows Admin Center を入れてみる

scp でファイル送っておく

```
# c:\ ルートに送る
> scp WindowsAdminCenter2110.msi tetsuyainfra@hv2019sv.local:\
        1 file(s) copied.
```
