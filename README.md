## 小黑修炼记

此文记录了『小黑』通不懈努力终而成为『小白』的羽化历程。望对心怀相同梦想的『小黑』有所帮助。

    『小黑』的畅想
     macOS: macOS High Sierra 10.13
    SMBIOS: MacBookAir6,2

[小黑](http://www.lenovo.com.cn/product/50081.html "LENOVO 小新 V2000 Bigger 版") | 示下
:-: | -
主板 | Lenovo Lancer 5A5 `BIOS Version: 9BCN29WW`
主板芯片组 | Intel Lynx Point-LP `南桥`, Intel Haswell `北桥`
CPU | Intel(R) Core(TM) i7-4510U CPU @ 2.00GHz `可睿频至 3.1GHz`
集显 | Intel HD Graphics 4400 `Haswell-ULT GT2`
独显 | NVIDIA GeForce 840M
声卡 | Conexant CX20751/2
有线 | Realtek RTL8168/8111 PCI-E `Realtek RTL8168GU`
无线和蓝牙| Intel 3160 AC &nbsp;--<sup>更换为</sup>-->&nbsp; Broadcom BCM4352 802.11AC
触控板 | ELAN

## 修炼途径
- Ⓐ [热修补](patch_hotpatch.md)
- Ⓑ [动手做](patch_static/patch_static.md)

**提示**：如果你已拥有与 Ⓐ 法现有 hotpatch 对应的相同设备，即可以此法修炼，否则请以 Ⓑ 法修炼，切记。

## 同步 Windows 与 macOS 时间
在 Windows 系统中，以管理员身份运行 CMD 执行下面的命令 `最简便的方法`
```cmd
reg add HKLM\SYSTEM\CurrentControlSet\Control\TimeZoneInformation /v RealTimeIsUniversal /t REG_DWORD /d 1
```

&nbsp;

The end. Enjoy :innocent:

&nbsp;

![whoami ^\_^](whoami.jpg)

&nbsp;

---

&nbsp;

## 项目
    .
    ├── maciasl-view        # GitHub 上 macisal 的查看（以 Vue、iView 构建）
    ├── patch_static        # 一种老旧的方法
    ├── patch_hotpatch.md   # 方法/过程
    ├── progress            # 完成度
    ├── README.md           # README
    └── whoami.jpg          # 预览
