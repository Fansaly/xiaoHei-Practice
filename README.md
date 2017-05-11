## 小黑修炼记

    修炼目标
    mac OS: macOS Sierra 10.12.4
    SMBIOS: MacBookAir6,2

[小黑原形](http://www.lenovo.com.cn/product/50081.html "LENOVO 小新 V2000 Bigger 版")如下 :sparkles:

设备 | 型号
:-: | -
主板 | Lenovo Lancer 5A5
主板芯片组 | Intel Lynx Point-LP `南桥`, Intel Haswell `北桥`
CPU | Intel(R) Core(TM) i7-4510U CPU @ 2.00GHz `可睿频至 3.1GHz`
集显 | Intel HD Graphics 4400 `Haswell-ULT GT2`
独显 | NVIDIA GeForce 840M
声卡 | Conexant CX20751/2
有线网卡 | Realtek RTL8168/8111 PCI-E `Realtek RTL8168GU`
无线网卡 | Intel(R) Dual Band Wireless-AC 3160
触控板 | ELAN

&nbsp;

---

## [制作 macOS U盘](https://www.tonymacx86.com/threads/unibeast-install-macos-sierra-on-any-supported-intel-based-pc.200564/#create_unibeast)


## [BIOS 设置](https://www.tonymacx86.com/threads/unibeast-install-macos-sierra-on-any-supported-intel-based-pc.200564/#uefi_settings)
> 1. To access BIOS/UEFI Setup, press and hold Delete on a USB Keyboard while the system is booting up
> 2. Load Optimized Defaults
> 3. If your CPU supports VT-d, disable it
> 4. If your system has CFG-Lock, disable it
> 5. If your system has Secure Boot Mode, disable it
> 6. Set OS Type to Other OS
> 7. If your system has IO SerialPort, disable it
> 8. Set XHCI Handoff to Enabled
> 9. If you have a 6 series or x58 system with AWARD BIOS, disable USB 3.0
> 10. Save and exit.


## DSDT/SSDTs 修改
-   **[Patching LAPTOP DSDT/SSDTs](https://www.tonymacx86.com/threads/guide-patching-laptop-dsdt-ssdts.152573/)**  
    工具:
    :one:[iasl](https://bitbucket.org/RehabMan/acpica/downloads/)
    :two:[patchmatic](https://bitbucket.org/RehabMan/os-x-maciasl-patchmatic/downloads/)
    :three:[MaciASL](https://bitbucket.org/RehabMan/os-x-maciasl-patchmatic/downloads/)


-   **显卡**  
    `Intel HD4400, Haswell-ULT GT2`  

    * 重命名节点 GFX0 -> IGPU  
    修改的表: `DSDT.dsl` `SSDT-1.dsl` `SSDT-3.dsl` `SSDT-4.dsl` `SSDT.dsl`  
    参考补丁: `[igpu] rename GFX0 to IGPU`  
    完成补丁: [:page_facing_up:](graphics_rename_node.txt) `核心未做修改`

    * 屏蔽独显  
    修改的表: `DSDT.dsl`  
    参考补丁: `[gfx0] Disable from _REG (DSDT)`  
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             `[gfx0] Disable/Enable on_WAK/_PTS (DSDT)`  
    完成补丁: [:page_facing_up:](graphics_disable_nv.txt) `核心未做修改`

    * 注入集显 device-id, ig-platform-id  
    修改的表: `SSDT-3.dsl`  
    参考补丁: `[igpu] Haswell HD4400/HD4600/HD5000`  
    完成补丁: [:page_facing_up:](graphics_inject_id.txt)

        id 获取 `两种途径`:
        [tonymacx86](https://www.tonymacx86.com/threads/fix-intel-hd4200-hd4400-hd4600-mobile-on-yosemite.145427/)
        [pcbeta](http://bbs.pcbeta.com/viewthread-1465761-1-1.html)


-   **声卡**  
    `Conexant CX20751/2`  
    注入 layout-id  
    修改的表: `DSDT.dsl`  
    参考补丁: `[audio] Audio Layout 12`  
    完成补丁: [:page_facing_up:](audio.txt)

    layout-id: [查看](https://github.com/vit9696/AppleALC/wiki/Supported-codecs)

    驱动文件:
    [AppleALC](https://github.com/vit9696/AppleALC)
    [Lilu](https://github.com/vit9696/Lilu)
    > AppleALC 1.1.1 : Requires Lilu 1.1.0 or newer  
    > AppleALC 1.1.0 : AppleALC now has its kernel patcher moved to Lilu.kext  
    > AppleALC 1.0.19: Added Conexant CX20751_2 HDMI/DisplayPort Output fix by syscl

-   **有线网卡**  
    `Realtek RTL8168GU`  
    驱动文件: [RealtekRTL8111.kext](https://bitbucket.org/RehabMan/os-x-realtek-network/downloads)

-   ~~***无线网卡／蓝牙***~~ :ghost:  
    ~~*`Intel(R) Dual Band Wireless-AC 3160`*~~


-   **键盘／触摸板**  
    `ELAN`  
    驱动文件: [ApplePS2SmartTouchPad.kext](http://forum.osxlatitude.com/index.php?/topic/1948-elan-focaltech-and-synaptics-smart-touchpad-driver-mac-os-x/)


-   **电源管理**  
    :bulb: 加载原生 AppleLPC  
    修改的表: `DSDT.dsl`  
    参考补丁: `[sys] Haswell LPC`  
    完成补丁: [:page_facing_up:](lpc.txt)

    id 查找方法: [查看](http://bbs.pcbeta.com/viewthread-1473630-1-1.html)

-   **亮度**  
    修改的表: `SSDT-3.dsl`  
    参考补丁: `[igpu] Brightness fix (Haswell/Broadwell)`  
    完成补丁: [:page_facing_up:](brightness.txt) `核心未做修改`

    驱动制作:
    1. [修复 macOS 10.12.4 较早版本的亮度](https://www.tonymacx86.com/threads/guide-patching-dsdt-ssdt-for-laptop-backlight-control.152659/)
    2. 需要这里的
    [PatchAppleBacklight_v2.zip](https://www.tonymacx86.com/threads/native-brightness-working-without-blinkscreen-using-patched-applebacklight-kext.121031/)
    文件
    3. [修复 macOS 10.12.4 版本的亮度](https://www.tonymacx86.com/threads/guide-laptop-backlight-control-using-applebacklightinjector-kext.218222/)
    `获得制作的两个文件 •SSDT-PNLF.aml •AppleBacklightInjector.kext`

-   **电池**  
    :bulb: 电池状态  
    修改的表: `DSDT.dsl`  
    完成补丁: [:page_facing_up:](battery.txt)  
    驱动文件: [ACPIBatteryManager.kext](https://bitbucket.org/RehabMan/os-x-acpi-battery-driver/downloads/)

    补丁制作:
    [tonymacx86](https://www.tonymacx86.com/threads/guide-how-to-patch-dsdt-for-working-battery-status.116102/)
    [pcbeta](http://bbs.pcbeta.com/viewthread-1521462-1-1.html)
    `后者为前者的中译版`

-   **睿频**  
    `Intel i7-4510U CPU @ 2.00GHz Turbo 3.1GHz`  
    脚本: [ssdtPRGen.sh](https://github.com/Piker-Alpha/ssdtPRGen.sh)

-   **USB**  
    :bulb: 加载原生 USB 3.0 驱动，解决睡眠立即自动唤醒等问题  
    修改的表: `DSDT.dsl`  
    参考补丁: `[usb] 7-series/8-series USB`  
    完成补丁: [:page_facing_up:](usb.txt) `核心未做修改`

-   **_睡眠_**  
    :heavy_multiplication_x:...:heavy_multiplication_x: *(我先去睡会...)*

---

-   **还需要的其它驱动**  

Relative Devices | Drive name | URL
:-----:| ---------------------------------- | ---------------------------------
System | FakeSMC.kext                       | [Download](https://bitbucket.org/RehabMan/os-x-fakesmc-kozlek/downloads/)
&nbsp; | • FakePCIID.kext                   | &nbsp;
&nbsp; | • FakePCIID_Intel_GbX.kext         | &nbsp;
System | • FakePCIID_Intel_HDMI_Audio.kext  | [Download](https://bitbucket.org/RehabMan/os-x-fake-pci-id/downloads/)
&nbsp; | • FakePCIID_Intel_HD_Graphics.kext | &nbsp;
&nbsp; | • FakePCIID_XHCIMux.kext           | &nbsp;
USB    | GenericUSBXHCI.kext                | [Download](https://bitbucket.org/RehabMan/os-x-generic-usb3/downloads/)
USB    | USBInjectAll.kext                  | [Download](https://bitbucket.org/RehabMan/os-x-usb-inject-all/downloads/)

---

&nbsp;

#### 同步 Windows 与 macOS 时间
在 Windows 系统中，以管理员身份运行 CMD 执行下面的命令 `最简便的方法`  
```cmd
reg add HKLM\SYSTEM\CurrentControlSet\Control\TimeZoneInformation /v RealTimeIsUniversal /t REG_DWORD /d 1
```

&nbsp;

The end. Enjoy :innocent:

&nbsp;

![whoami ^\_^](whoami.jpg)
