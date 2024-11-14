---
title: Factorioでロボットステーションのブループリント作成
date: 2022-04-10 01:36:16+09:00
category: Diary
author: tetsuyainfra
tag:
  - Game
  - Factorio
# topImage: VampireSurvivors_Normal_stage4.png
slug: factorio-robot-station-blueprint
# hero_image: wolfgang-hasselmann-zTNv5fteUWI-unsplash.jpg
# hero_image_alt: 'A tree on wheat field'
# hero_image_credit_text: 'Wolfgang Hasselmann'
# hero_image_credit_url: https://unsplash.com/photos/zTNv5fteUWI
---

## 次の２枚見ればわかるはず

# 覚書
- グリッドサイズ 100x100
- ポジション 2, 4
- 絶対位置0,0 (ゲーム内の絶対位置？)
- ロボットネットワークの半径相当のグリッドサイズは25x25マス
  - なので4半径分で100マス
  - ボスステは4x4マス
  - 電柱は2x2マス

# BP

```text
0eNqtmN1uozAQhV8l8rWp8M8YyKtUUQWJ27VEgAWn26jKu68dlmi1i+OM25vgEPyNx/E5xvNJmvakh9F0lmw/yUFP+9EM1vQd2ZJX86EPm7o1b91Rd3Yz9k1vN5Ot/e+bZtg0543Vdjqda9O9jvWG51xmjGUMCCVTVw+Z7bO30Rw8+4NsWZ5Tcr5eL5TUzdS3J6sz/+RgujeyteNJU2L2fTeR7fMnmVzouvW9u/qo3ZD8EIZ+tMT1N91Be+iF/v2gPQ/+wXcz2pO7Q5ee8xOZ/Ksnv+wocYkZa/Qc7/rl/NKdjo0eHfrWuzFvmW713o5mnw19qx146Cczz9Q1OZhzy8TFD+gfEqf/ZRAC+KkZ9c+TnuzLq2mtHif/wOSCm2Vebqnv1oKJW7B6mvSxad3cZsd6/8N0OuMrgfkTXEOLJ1jjyVSeWucBlgd/eNU6T6XyGF8HFqkJM1gHlsnAch1YJaxMztdILE8dGw8ky1gyMZAt46n/sGABokgmygAxWSWiCBAhlSjzAFE9YkNiZsgv+xArMKt0XqSyWCVhBSSWmQjNbYUEqgiQY2VUxYBYFTEeI2JVxCBGxKrI29l9IlZFnMWIgFmEHO6sQo7daHg0XexOI6LpopUiY0SsVLyf3SUKrFa8n90nYsUiYwYhsGKRMYcQImHPXl+IAr3XRNNF7zXRdNFvZTFHFFixqJgjCqxYVMwRBXpfiVmExIqliFmERB1rinuOKLEqKaLpYreUMpouVixlzBElVixlzBElVixVzBElVixVzCIkVixVzCIk6hSzFA/WVyLkD7zazgD4+gkb2OPn+e8I90j5YJmf74iHPh0tIoRACQFkMjFUREDvWIusIVBGAJVKVIE6AhSpWavA2RrKZGLgbA0ppYRitZSg8tTBFYF0FUsmBtJVPPVPLgOlBCWSiYFSgkoWSxlwWgWpxCpQSlAPlRL4zPh6KUEVCau0Wt0pVPm4d8+FaszQd5T8MuO1nPzMKNCKwo4+u0/q3v99kxWu7Y6Zvu0vy31/oe7V7NaGuau/ReXc9reomwrYuTDG6qOfjlv9npJ3N7prDqB4JasKpMylAHW5/AawlsO0
```