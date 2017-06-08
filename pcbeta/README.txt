[size=4][color=#8b0000][b]作为小白，一路摸爬滚打，查阅了很多各路大神的心得，由于太多太多都没有一一记住 :(
不过分享小白我的心路历程以表谢意！[/b][/color][/size]

[size=3][color=#800080]我已经改的很努力了，如果效果不太好大家可以去这里查看：[/color][/size]
[url=https://github.com/Fansaly/xiaoHei-Practice/blob/master/README.md]https://github.com/Fansaly/xiaoHei-Practice/blob/master/README.md[/url]

[b][size=5]小黑修炼记[/size][/b]
修炼目标
mac OS: macOS Sierra 10.12.5
SMBIOS: MacBookPro11,2

[color=#24292e][size=16px][color=#366d6][url=http://www.lenovo.com.cn/product/50081.html]小黑原形[/url][/color]如下 ✨[/size][/color]
[table]
[tr][td][align=center]设备[/align][/td][td][align=center]型号[/align][/td][/tr]
[tr][td][align=center]主板[/align][/td][td]LENOVO 9BCN29WW[/td][/tr]
[tr][td][align=center]主板芯片组[/align][/td][td]Intel Lynx Point-LP 南桥, Intel Haswell 北桥[/td][/tr]
[tr][td][align=center]CPU[/align][/td][td]Intel(R) Core(TM) i7-4510U CPU @ 2.00GHz 可睿频至 3.1GHz[/td][/tr]
[tr][td][align=center]集显[/align][/td][td]Intel HD Graphics 4400 Haswell-ULT GT2[/td][/tr]
[tr][td][align=center]独显[/align][/td][td]NVIDIA GeForce 840M[/td][/tr]
[tr][td][align=center]声卡[/align][/td][td]Conexant CX20751/2[/td][/tr]
[tr][td][align=center]有线[/align][/td][td]Realtek RTL8168/8111 PCI-E Realtek RTL8168GU[/td][/tr]
[tr][td][align=center]无线和蓝牙[/align][/td][td]Intel 3160 AC  --[size=12px]更换为[/size]-->  Broadcom BCM4352 802.11AC[/td][/tr]
[tr][td][align=center]触控板[/align][/td][td]ELAN[/td][/tr]
[/table]

[hr]

[b][color=#366d6][size=5][url=https://www.tonymacx86.com/threads/unibeast-install-macos-sierra-on-any-supported-intel-based-pc.200564/#create_unibeast]制作 macOS U盘[/url][/size][/color][/b]

[b][color=#366d6][size=5][url=https://www.tonymacx86.com/threads/unibeast-install-macos-sierra-on-any-supported-intel-based-pc.200564/#uefi_settings]BIOS 设置[/url][/size][/color][/b][indent][list=1]
[*]To access BIOS/UEFI Setup, press and hold Delete on a USB Keyboard while the system is booting up
[*]Load Optimized Defaults
[*]If your CPU supports VT-d, disable it
[*]If your system has CFG-Lock, disable it
[*]If your system has Secure Boot Mode, disable it
[*]Set OS Type to Other OS
[*]If your system has IO SerialPort, disable it
[*]Set XHCI Handoff to Enabled
[*]If you have a 6 series or x58 system with AWARD BIOS, disable USB 3.0
[*]Save and exit.[/list][/indent]

[b][size=5]DSDT/SSDTs 修改[/size][/b][list]
[*][b][color=#366d6][url=https://www.tonymacx86.com/threads/guide-patching-laptop-dsdt-ssdts.152573/]Patching LAPTOP DSDT/SSDTs[/url][/color][/b]
工具: [img=20,20]https://assets-cdn.github.com/images/icons/emoji/unicode/0031-20e3.png[/img] [color=#366d6][url=https://bitbucket.org/RehabMan/acpica/downloads/]iasl[/url][/color] [img=20,20]https://assets-cdn.github.com/images/icons/emoji/unicode/0032-20e3.png[/img] [color=#366d6][url=https://bitbucket.org/RehabMan/os-x-maciasl-patchmatic/downloads/]patchmatic[/url][/color] [img=20,20]https://assets-cdn.github.com/images/icons/emoji/unicode/0033-20e3.png[/img] [color=#366d6][url=https://bitbucket.org/RehabMan/os-x-maciasl-patchmatic/downloads/]MaciASL[/url][/color]
[/list][list]
[*][b]显卡[/b]
Intel HD4400, Haswell-ULT GT2
[list]
[*]重命名节点 GFX0 -> IGPU
修改的表: DSDT.dsl SSDT-1.dsl SSDT-3.dsl SSDT-4.dsl SSDT.dsl
参考补丁: [igpu] rename GFX0 to IGPU
完成补丁: [url=https://github.com/Fansaly/xiaoHei-Practice/blob/master/patches/graphics_rename_node.txt][img=20,20]https://assets-cdn.github.com/images/icons/emoji/unicode/1f4c4.png[/img][/url] 核心未做修改
[*]屏蔽独显
修改的表: DSDT.dsl
参考补丁: [gfx0] Disable from _REG (DSDT)
                [gfx0] Disable/Enable on_WAK/_PTS (DSDT)
完成补丁: [url=https://github.com/Fansaly/xiaoHei-Practice/blob/master/patches/graphics_disable_nv.txt][img=20,20]https://assets-cdn.github.com/images/icons/emoji/unicode/1f4c4.png[/img][/url] 核心未做修改
[*]注入集显 device-id, ig-platform-id
修改的表: SSDT-3.dsl
参考补丁: [igpu] Haswell HD4400/HD4600/HD5000
完成补丁: [url=https://github.com/Fansaly/xiaoHei-Practice/blob/master/patches/graphics_inject_id.txt][img=20,20]https://assets-cdn.github.com/images/icons/emoji/unicode/1f4c4.png[/img][/url]

id 获取 两种途径: [color=#366d6][url=https://www.tonymacx86.com/threads/fix-intel-hd4200-hd4400-hd4600-mobile-on-yosemite.145427/]tonymacx86[/url][/color] | [color=#366d6][url=http://bbs.pcbeta.com/viewthread-1465761-1-1.html]pcbeta[/url][/color]
[/list]
[/list][list]
[*][b]声卡[/b]
Conexant CX20751/2
[img=20,20]https://assets-cdn.github.com/images/icons/emoji/unicode/1f4a1.png[/img] 注入 layout-id
修改的表: DSDT.dsl
参考补丁: [audio] Audio Layout 12
完成补丁: [url=https://github.com/Fansaly/xiaoHei-Practice/blob/master/patches/audio.txt][img=20,20]https://assets-cdn.github.com/images/icons/emoji/unicode/1f4c4.png[/img][/url]

layout-id: [color=#366d6][url=https://github.com/vit9696/AppleALC/wiki/Supported-codecs]github[/url][/color]

驱动文件: [color=#366d6][url=https://github.com/vit9696/AppleALC]AppleALC[/url][/color] , [color=#366d6][url=https://github.com/vit9696/Lilu]Lilu[/url][/color]
[indent]AppleALC 1.1.1 : Requires Lilu 1.1.0 or newer
AppleALC 1.1.0 : AppleALC now has its kernel patcher moved to Lilu.kext
AppleALC 1.0.19: Added Conexant CX20751_2 HDMI/DisplayPort Output fix by syscl
[/indent]
[/list][list]
[*][b]有线网卡[/b]
Realtek RTL8168GU
驱动文件: [color=#366d6][url=https://bitbucket.org/RehabMan/os-x-realtek-network/downloads]RealtekRTL8111.kext[/url][/color]
[/list][list]
[*][b][i]无线网卡[/i][/b] [img=20,20]https://assets-cdn.github.com/images/icons/emoji/unicode/1f47b.png[/img]
[i]Broadcom BCM4352 802.11AC (BCM94352Z)[/i]
[img=20,20]https://assets-cdn.github.com/images/icons/emoji/unicode/1f4a1.png[/img] 在 Windows 操作系统下 [color=#366d6][url=https://www.tonymacx86.com/threads/guide-lenovo-g50-70-and-z50-70-bios-whitelist-removal.187340/]移除白名单[/url][/color] 之后，更换新的无线网卡
驱动文件: [color=#366d6][url=https://bitbucket.org/RehabMan/os-x-fake-pci-id/downloads]FakePCIID_Broadcom_WiFi.kext[/url][/color] 依赖 FakePCIID.kext

[indent][b]Broadcom WiFi BCM94352 requires additional patches[/b]

The patch was created by the-darkvoid.

eg. in KextsToPatch:
Comment: AirPortBrcm4360 - fcvo, 10.12.x (credit the-darkvoid)
MatchOS: 10.12.x
Name: AirPortBrcm4360
Find: <81f952aa 00007529>
Replace: <81f952aa 00006690>

Additional background: [color=#366d6][url=http://www.insanelymac.com/forum/topic/312759-fix-macos-sierra-dp1-bcm94532z-wifi/]insanelymac[/url][/color]
[/indent]
[/list][list]
[*][b][i]蓝牙[/i][/b] [img=20,20]https://assets-cdn.github.com/images/icons/emoji/unicode/1f47b.png[/img]
驱动文件: [color=#366d6][url=https://bitbucket.org/RehabMan/os-x-brcmpatchram/downloads]BrcmFirmwareData.kext[/url][/color] , [color=#366d6][url=https://bitbucket.org/RehabMan/os-x-brcmpatchram/downloads]BrcmPatchRAM2.kext[/url][/color]
[/list][list]
[*][b]键盘／触摸板[/b]
ELAN
驱动文件: [color=#366d6][url=http://forum.osxlatitude.com/index.php?/topic/1948-elan-focaltech-and-synaptics-smart-touchpad-driver-mac-os-x/]ApplePS2SmartTouchPad.kext[/url][/color]
[/list][list]
[*][b]电源管理[/b]
[img=20,20]https://assets-cdn.github.com/images/icons/emoji/unicode/1f4a1.png[/img] 加载原生 AppleLPC
修改的表: DSDT.dsl
参考补丁: [sys] Haswell LPC
完成补丁: [url=https://github.com/Fansaly/xiaoHei-Practice/blob/master/patches/lpc.txt][img=20,20]https://assets-cdn.github.com/images/icons/emoji/unicode/1f4c4.png[/img][/url]

id 查找方法: [color=#366d6][url=http://bbs.pcbeta.com/viewthread-1473630-1-1.html]pcbeta[/url][/color]
[/list][list]
[*][b]亮度[/b]
修改的表: SSDT-3.dsl
参考补丁: [igpu] Brightness fix (Haswell/Broadwell)
完成补丁: [url=https://github.com/Fansaly/xiaoHei-Practice/blob/master/patches/brightness.txt][img=20,20]https://assets-cdn.github.com/images/icons/emoji/unicode/1f4c4.png[/img][/url] 核心未做修改

驱动制作:
[list=1]
[*][color=#366d6][url=https://www.tonymacx86.com/threads/guide-patching-dsdt-ssdt-for-laptop-backlight-control.152659/]修复 macOS 10.12.4 较早版本的亮度[/url][/color]
[*]需要这里的 [color=#366d6][url=https://www.tonymacx86.com/threads/native-brightness-working-without-blinkscreen-using-patched-applebacklight-kext.121031/]PatchAppleBacklight_v2.zip[/url][/color] 文件
[*][color=#366d6][url=https://www.tonymacx86.com/threads/guide-laptop-backlight-control-using-applebacklightinjector-kext.218222/]修复 macOS 10.12.4 版本的亮度[/url][/color] 获得制作的两个文件 •SSDT-PNLF.aml •AppleBacklightInjector.kext
[/list]
[b]Additional[/b]
[indent]The patch was created by RehabMan.

eg. in KextsToPatch:
Comment: change F%uT%04x to F%uTxxxx in AppleBacklightInjector.kext (credit RehabMan)
Name: com.apple.driver.AppleBacklight
Find: <46257554 25303478 00>
Replace: <46257554 78787878 00>

Additional background of Installation: [color=#366d6][url=https://www.tonymacx86.com/threads/guide-laptop-backlight-control-using-applebacklightinjector-kext.218222/]tonymacx86[/url][/color]
[/indent]
[/list][list]
[*]电池
[img=20,20]https://assets-cdn.github.com/images/icons/emoji/unicode/1f4a1.png[/img] 电池状态
修改的表: DSDT.dsl
完成补丁: [url=https://github.com/Fansaly/xiaoHei-Practice/blob/master/patches/battery.txt][img=20,20]https://assets-cdn.github.com/images/icons/emoji/unicode/1f4c4.png[/img][/url]
驱动文件: [color=#366d6][url=https://bitbucket.org/RehabMan/os-x-acpi-battery-driver/downloads/]ACPIBatteryManager.kext[/url][/color]

补丁制作: [color=#366d6][url=https://www.tonymacx86.com/threads/guide-how-to-patch-dsdt-for-working-battery-status.116102/]tonymacx86[/url][/color] | [color=#366d6][url=http://bbs.pcbeta.com/viewthread-1521462-1-1.html]pcbeta[/url][/color] (后者为前者的中译版)
[/list][list]
[*][b]睿频[/b]
Intel i7-4510U CPU @ 2.00GHz Turbo 3.1GHz
脚本: [color=#366d6][url=https://github.com/Piker-Alpha/ssdtPRGen.sh]ssdtPRGen.sh[/url][/color]
[/list][list]
[*][b]USB[/b]
[img=20,20]https://assets-cdn.github.com/images/icons/emoji/unicode/1f4a1.png[/img] 加载原生 USB 3.0 驱动，解决睡眠立即自动唤醒等问题
修改的表: DSDT.dsl
参考补丁: [usb] 7-series/8-series USB
完成补丁: [url=https://github.com/Fansaly/xiaoHei-Practice/blob/master/patches/usb.txt][img=20,20]https://assets-cdn.github.com/images/icons/emoji/unicode/1f4c4.png[/img][/url] 核心未做修改
[/list][list]
[*][b][i]睡眠[/i][/b]
✖️...✖️ [i](我先去睡会...)[/i]
[/list]
[hr]
[list]
[*][b]还需要的其它驱动 by RehabMan[/b]
[table]
[tr][td][align=center]Relative Devices[/align][/td][td][align=center]Drive name[/align][/td][td][align=center]URL[/align][/td][/tr]
[tr][td][align=center]System[/align][/td][td]FakeSMC.kext[/td][td][url=https://bitbucket.org/RehabMan/os-x-fakesmc-kozlek/downloads/]bitbucket[/url][/td][/tr]
[tr][td][align=center]System[/align][/td][td]• FakePCIID.kext[/td][td][url=https://bitbucket.org/RehabMan/os-x-fake-pci-id/downloads/]bitbucket[/url][/td][/tr]
[tr][td][align=center]GPU[/align][/td][td]• FakePCIID_Intel_HD_Graphics.kext[/td][td]ibid.[/td][/tr]
[tr][td][align=center]HD-Audio[/align][/td][td]• FakePCIID_Intel_HDMI_Audio.kext[/td][td]ibid.[/td][/tr]
[tr][td][align=center]USB[/align][/td][td]• FakePCIID_XHCIMux.kext[/td][td]ibid.[/td][/tr]
[tr][td][align=center]GPU[/align][/td][td]IntelGraphicsFixup.kext[/td][td][color=#366d6][url=https://bitbucket.org/RehabMan/intelgraphicsfixup/downloads/]bitbucket[/url][/color][/td][/tr]
[tr][td][align=center]USB[/align][/td][td]GenericUSBXHCI.kext[/td][td][color=#366d6][url=https://bitbucket.org/RehabMan/os-x-generic-usb3/downloads/]bitbucket[/url][/color][/td][/tr]
[tr][td][align=center]USB[/align][/td][td]USBInjectAll.kext[/td][td][color=#366d6][url=https://bitbucket.org/RehabMan/os-x-usb-inject-all/downloads/]bitbucket[/url][/color][/td][/tr]
[/table]
[/list]
[hr]

[b][size=3]Bad Apple[/size][/b]
[indent]Graphics boot glitch patch for 10.12

A new patch is required.

eg. in KextsToPatch:
Comment: Boot graphics glitch, 10.12.dp1 (credit denskop)
MatchOS: 10.12.x
Name: IOGraphicsFamily
Find: <01000075 25>
Replace: <010000eb 25>

Read also here for further information/tips: [color=#366d6][url=https://www.tonymacx86.com/threads/fix-resolve-boot-screen-garble.175799/]tonymacx86[/url][/color]

For those too lazy to read, keep in mind:
- the glitch fix does not remove the glitch entirely... it only reduces the severity
- the glitch fix is most effective if CSM/legacy boot is enabled in BIOS
[/indent]

[b][size=3]同步 Windows 与 macOS 时间[/size][/b]
[align=left][color=#24292e][size=16px]在 Windows 系统中，以管理员身份运行 CMD 执行下面的命令 最简便的方法[/size][/color][/align]
[color=#a71d5d]reg[/color] add HKLM\SYSTEM\CurrentControlSet\Control\TimeZoneInformation /v RealTimeIsUniversal /t REG_DWORD /d [color=#086b3]1[/color]


The end. Enjoy [img=20,20]https://assets-cdn.github.com/images/icons/emoji/unicode/1f607.png[/img]


[img]https://raw.githubusercontent.com/Fansaly/xiaoHei-Practice/master/whoami.jpg[/img]
