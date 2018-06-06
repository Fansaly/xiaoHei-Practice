Strix | 配置
:-: | -
主板 | ROG STRIX X299-E GAMING
CPU | INTEL® CORE™ i7-7800X
显卡 | ROG STRIX-GTX1080-A8G-GAMING
内存 | CORSAIR VENGEANCE LPX DDR4 2400 16GB (8Gx2)
硬盘 | SAMSUNG 960 EVO 500G M.2 NVMe
水冷 | CORSAIR H100i V2
电源 | CORSAIR RM650x
鼠标 | LOGITECH G403
键盘 | LOGITECH G413
机箱 | JONSBO UMX4

---

### BIOS
> **在设置之前，请先将 X299-E GAMING 的 BIOS 版本升级到 1301 或更高。**

- **/AI Tweaker/**
  - ASUS MultiCore Enhancement: **Auto** *[optional "Disabled"]*
  - AVX Instruction Core Ratio Negative Offset: **3** *[optional "Auto"]*
  - AVX-512 Instruction Core Ratio Negative Offset: **2** *[optional "Auto"]*
  - CPU Core Ratio: **Sync All Cores** *[optional "Auto"]*
  - **CPU SVID Support: Enabled** *[fundamental for proper IPG CPU power consumption display]*
  - DRAM Frequency: **DDR4-2400MHz**

- **/Advanced/CPU Configuration/**
  - Hyper Threading [ALL]: **Enabled**
  - **MSR Lock Control: Enabled**

- **/Advanced/CPU Configuration/CPU Power Management Configuration/**
  - **Enhanced Intel Speed Step Technology (EIST): Enabled**
  - Autonomous Core C-States: **Enabled**
  - Enhanced Halt State (C1E): **Enabled**
  - CPU C6 report: **Enabled**
  - Package C-State: **C6(non retention) state**
  - **Intel SpeedShift Technology: Enabled** *(crucial for native HWP Intel SpeedShift Technology CPU Power Management)*
  - MFC Mode Override: **OS Native**

- **/Advanced/Platform Misc Configuration/**
  - PCI Express Native Power Management: **Disabled**
  - PCH DMI ASPM: **Disabled**
  - ASPM: **Disabled**
  - DMI Link ASPM Control: **Disabled**
  - PEG - ASMP: **Disabled**

- **/Advanced/System Agent Configuration/**
  - Intel VT for Directed I/O (VT-d): **Disabled**

- **/Boot/**
  - Fast Boot: **Disabled**
  - Above 4G Decoding: **Off**

- **/Boot/Boot Configuration**
  - Boot Logo Display: **Auto**
  - Boot up NumLock State: **Disabled**
  - Setup Mode: **Advanced**

- **/Boot/Compatibility Support Module/**
  - Launch CSM: **Disabled**

- **/Boot/Secure Boot/**
  - OS Type: **Other OS**

### Clover
- drivers64UEFI
  - [x] AppleImageCodec-64.efi
  - [x] AppleKeyAggregator-64.efi
  - [x] AppleUITheme-64.efi
  - [x] AptioMemoryFix.efi
  - [x] DataHubDxe-64.efi
  - [x] FirmwareVolume-64.efi
  - [x] FSInject-64.efi
  - [x] apfs.efi
- kexts/Other
  - [x] AppleALC.kext
  - [x] FakeSMC.kext
  - [x] HibernationFixup.kext
  - [x] IntelMausiEthernet.kext
  - [x] Lilu.kext
  - [x] NvidiaGraphicsFixup.kext
  - [x] TSCAdjustReset.kext
- [config.plist](config.plist)

### TSCAdjustReset.kext
为了避免使用 Skylake-X 处理器的 X299 主板，在启动过程中或者从 S3 模式中唤醒时，TSC 出现同步异常（这种情况可能是由错误的 Skylake-X BIOS 微码引起的），我们需要使用由 interferenc 提供的 TSCAdjustReset.kext 来修复它。

从 Github 下载 TSCAdjustRest.kext 源码，并用 Xcode 编译：
```bash
git clone https://github.com/interferenc/TSCAdjustReset
cd TSCAdjustReset/
xcodebuild
```

编译成功后，可以在 `TSCAdjustReset/build/Release/` 中找到 TSCAdjustRest.kext。  

默认情况下，TSCAdjustRest.kext 配置为 8 核心 CPU（16 线程）。  
若要应用于多于或少于 8 个内核的 Skylake-X 处理器，  
请依照以下步骤修改：

> 1.) 右击 TSCAdjustRest.kext 文件夹，并选择“显示包内容”。  
> 2.) 打开 contents 目录，编辑 Info.plist 文件。  
> 3.) 查找 IOCPUNumber 条目。  
> 4.) 注意 IOCPUNumber 为 Skylake-X 处理器的 `线程数 - 1`（线程数始终是其核心数的两倍）

那么，6 核心 i7-7800X 的 IOCPUNumber 应为 11（12 个线程 - 1）
```xml
<key>IOCPUNumber</key>
<integer>11</integer>
```

---

> 详细请访问：[How to build your own iMac Pro [Successful Build/Extended Guide]](https://www.tonymacx86.com/threads/how-to-build-your-own-imac-pro-successful-build-extended-guide.229353/)
