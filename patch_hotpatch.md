> 译自：[[Guide] Lenovo Z50-70/Z40-70 using Clover UEFI (10.11)](https://www.tonymacx86.com/threads/guide-lenovo-z50-70-z40-70-using-clover-uefi-10-11.179520/)  
> 作者: the-braveknight  
> 更新: 2017/5/10

---

### 概述
本指南的目的是提供适用于联想 Z50-70<sup id="ref-1">[[1]](#note-1)</sup> 和 Z40-70 的一种“循序渐进”安装 EI Capitan 的方法。

**提醒**：本指南完全基于 RehabMan 的指南和脚本，我不应因此而受到任何赞誉，我仅仅是对他的脚本和工具做适当的修改以适用 Z50-70。

我的机型：一款 Z50-70 和 Broadcom BCM943602BAED 无线网卡以及 SSD 硬盘。

这款笔记本的 BIOS 中含有 WiFi 白名单，为了使将要安装的 OS X 兼容无线网卡，我们必须先攻克它。

### 所需设备
- 联想 Z50-70 或者 Z40-70
- 从 Mac App Store 中下载获得的 OS X EI Capitan 或者 Yosemite
- 8GB 的 U盘
- Broadcom BCM943602BAED 或者 BCM94352Z 的无线／蓝牙

### BIOS 设置
恢复 BIOS 为 Windows 的默认状态  
之后，确定：
- UEFI boot 状态 enabled
- Secure boot 状态 disabled
- 启用 Legacy Boot (but UEFI first)，这样在启动时可以有效地减少“花屏”

提醒：如果你的笔记本可以禁用显卡（Nvidia），保持它在 BIOS 中的启用状态。因为当我们使用 OS X 时，它将被 SSDT-NVDA.aml 自动禁用。

### 准备 USB、开始安装
- 使用 createinstallmedia 方式。它可以很好的完成任务，并且产生错误的几率很小。这种方法同时也为你提供了一个 OS X 恢复分区。前往查看 RehabMan 的详细指南 >
[[Guide] Booting the OS X Installers on LAPTOPS with Clover](http://www.tonymacx86.com/el-capitan-laptop-support/148093-guide-booting-os-x-installer-laptops-clover.html)

- 毫无疑问，将 RealtekRTL8111.kext 复制到 Clover/kexts/Other，因为网络连接在「[完成安装后](#完成安装后)」是至关重要的。剩余的部分也依赖于它。复制 FakePCIID.kext 和 FakePCIID_Broadcom_WiFi.kext 到 Clover/kexts/Other 备用，这些将启用你安装好了的可兼容无线网卡。

    提醒：FakePCIID.kext 和 FakePCIID_Broadcom_WiFi.kext 可以从这里获取：https://github.com/RehabMan/OS-X-Fake-PCI-ID

- 有一些笔记本使用的是 ELAN 触控板，RehabMan 的 VoodoPS2Controller.kext 就不能让它正常运作，因此从 Z50 仓库下载适用 ELAN 的 kext 以备用。

- 从可以让 USB 更好工作的 AppleUSBXHCI.kext 诞生起，GenericUSBXHCI.kext 对这款笔记本不再是必需的了。并且，GenericUSBXHCI.kext 在 10.11 上不能正常工作。所以可以不使用它了。

- 使用 Z50 仓库的 config_install.plist：https://github.com/the-braveknight/Lenovo-Z50-DSDT-Patch/raw/master/config_install.plist

### 完成安装后
- 下载 Clover UEFI：[Clover UEFI Bootloader](http://sourceforge.net/projects/cloverefiboot/)
- 安装 Clover UEFI 到你本机的 SSD/HDD，切记点击 ***Customize*** 并选择：
    + [x] Install for UEFI booting only
    + [x] Install Clover in the ESP
    + [ ] Dirvers64UEFI
        + [x] OsxAptioFixDrv-64
- 复制 [HFSPlus.efi](https://github.com/JrCs/CloverGrowerPro/blob/master/Files/HFSPlus/X64/HFSPlus.efi?raw=true)
到 drivers64UEFI 目录

一些安装工具和为了更容易修补而提供的脚本，以及其他工具，都在仓库：http://github.com/the-braveknight/Lenovo-Z50-DSDT-Patch

准备开始，先要安装开发者工具。运行 Terminal 输入：
```shell
git
```

系统将提示你安装开发者工具。由于之前已经连接到了网络，所以选择 ***Continuing***，之后系统将下载并且自动安装它们。  
开发者工具安装完成之后，我们需要在本地创建一个位于 GitHub 上的项目副本。
```shell
mkdir ~/Projects
cd ~/Projects
git clone https://github.com/the-braveknight/Lenovo-Z50-DSDT-Patch.git z50.git
```
接下来，安装一些工具和所需要的 kexts ...  
下载 kexts 和工具：
```shell
cd ~/Projects/z50.git
./download.sh
```
安装：
```shell
./install_downloads.sh
```
如果你使用 ELAN 触控板，可以这样安装：
```shell
./install_downloads.sh elan
```

`download.sh` 脚本将自动从 bitbucket 收集最新版本的工具（包含 patchmatic、iasl、MaciASL）和 kexts（包含 IntelBacklight.kext、ACPIBatteryManager.kext，等等）。`install_download.sh` 将会自动的安装它们到正确位置。

如果你愿意，可以重新启动，以验证更多的硬件已经正常运作。<sup id="ref-2">[[2]](#note-2)</sup>

要完成这一步设置，我们需要被正确修补的 DSDT/SSDT。

此项目不会去修补 DSDT/SSDTs，而是使用 Clover 的 hotpatches 和一组较小的 SSDTs 来代替。
```shell
cd ~/Projects/z50.git
make
make install
```
`make` 脚本用来编译已被修补的文件<sup id="ref-3">[[3]](#note-3)</sup>（需要 iasl），生成的文件位于目录 `./build`。

最终，`make install` 脚本先是挂载 EFI 分区，再复制上一步生成的文件到 `EFI/Clover/ACPI/patched` 以使 Clover 加载它们。

### 10.12 注意事项
10.12 的大部分更改已经在项目中完成，或已由 Apple 在 10.12.1+ 中修复。<sup id="ref-4">[[4]](#note-4)</sup>

SysPrefs->Displays 未被加载的问题，必须通过 Clover 注入 EDID 来解决，我已经创建了一个脚本 `patch_edid.sh`。只有受到此问题影响时，才应该运行该脚本。我猜测使用 1080p FHD 显示屏的用户不会受到影响，你应该在运行脚本之前检查一下。

使用这个脚本：
```shell
cd ~/Projects/z50.git
./patch_edid.sh
```
### 电源管理
在以上步骤中已经提供了 CPU/IGPU 电源管理所需的一切。  
不再需要使用 ssdtPRgen.sh 脚本了。

另外，请注意，hackintosh 不支持 _写入到磁盘_ 或 _S4_ 的休眠模式。

你需要禁用它：
```shell
sudo pmset -a hibernatemode 0
sudo rm /var/vm/sleepimage
sudo mkdir /var/vm/sleepimage
```
即使巧妙的使用了一个同名目录来帮助我们禁用它，但是系统更新后仍会重新启用它，因此在每次更新之后要检查休眠模式并禁用它。

### 最终的 config.list
直到现在，你一直在使用与安装相同的 config.plist。在所有 APCI 文件就绪之后（往前两部分<sup id="ref-5">[[5]](#note-5)</sup>），你可以使用 Z50 仓库中最终的 config.plist 文件了。

首先，挂载 EFI 分区：
```shell
cd ~/Projects/z50.git
sudo ./mount_efi.sh /
```
之后，复制这个文件：
```shell
cp config.plist /Volumes/EFI/EFI/Clover/config.plist
```
将 config.plist 从仓库复制到 EFI/Clover/config.plist 之后，应该自定义 SMBIOS，它便拥有了唯一的 serial。可以使用 Clover Configurator（使用 google 查找／下载它）生成。***不要*** 使用 Clover Configurator 编辑真实的 config.plist，而是编辑一个“虚拟”的 config.plist 来存储 SMBIOS 数据，然后使用 plist 编辑器（我使用 Xcode）复制／粘贴 将 SMBIOS 部分复制到当前使用的 config.plist 中。Clover Configurator 有很多 bug，因此不要完全信任它对 config.plist 的编辑结果。本指南使用 MacBookAir6,2，不要使用其他型号。

重申：***不要使用 Clover Configurator 编辑你的 config.plist***。它可能会删除 config.plist 中重要的设置，致使不能达到所期望的。

&nbsp;

### 请继续阅读
尽管大部分任务都已完成，但请继续阅读本指南，还有一些重要的信息你应该知道。

请务必访问「[已知问题](#已知问题)」，特别是其中“声音”部分的说明。通常，即使在完成上述所有任务之后，音频也不会在第一次重启后工作。你必须按照该部分中的具体说明来获取缓存中音频的 kexts。

如有问题出现，可在「[问题报告](#问题报告)」中询问，但请不要附带所有的文件。

### BIOS 模块兼容 WiFi 的安装
这款笔记本的 BIOS 中含有 WiFi 白名单，为了使将要安装的 OS X 兼容无线网卡，，我们必须先攻克它。  
更多信息请查看指南：http://www.tonymacx86.com/el-capitan-laptop-support/187340-guide-lenovo-g50-70-z50-70-bios-whitelist-removal.html

### WiFi 使用 BCM94352Z
`./download.sh` 和 `./install_downloads.sh` 脚本均已得到更新，并且会安装 BCM94352Z 必要的 kexts。

`config.list` 中已包含 5GHz WiFi 和 蓝牙 Handoff 所需的补丁。在 US/FCC 条件下的 5GHz 补丁是由 the-darkvoid 提供的。如果你的（Country Code）不是 US，你可能需要考虑其它补丁。可以在这里查看：http://www.tonymacx86.com/network/104850-guide-airport-pcie-half-mini-v2.html

### WiFi 使用 BCM943602BAED (DW1830)
一个新的选择！

这张网卡近乎原生，它与原始 Mac（BCM4360）中的芯片相同，已认证 OOB<sup id="ref-6">[[6]](#note-6)</sup>，FakePCIID 可以使用与之相应的 AirPort 标识。在 macOS Sierra (10.12) 中，它不像 BCM4352 网卡那样需要 5GHz 或者 fcvo 补丁。

并且 BCM943602BAED 还使用了最新蓝牙 4.1 技术...

### 项目库的更新
有时会更新一些有用的到远程项目库。所以，你可能需要更新你的副本，用来重新修补 DSDT/SSDT。

缘于你使用 git, 所以这很简单 ...
```shell
cd ~/Projects/z50.git
git pull
./download.sh
./install_downloads.sh
./update_config.sh
make
make install
```

&nbsp;

### 正常使用
- [x] UEFI 启动通过 Clover 实现
- [x] 内建 键盘（Fn 组合键可用）
- [x] 内建 触控板（基本手势）
- [x] HDMI 视频／音频（支持热插拔）
- [x] AirPlay 镜像到 AppleTV
- [x] 原生 WiFi 通过 BCM943602BAED 实现
- [x] 蓝牙（Handoff 可用）使用 BCM943602BAED
- [x] 原生 USB3 使用 AppleUSBXHCI（USB2 也工作在其上）
- [x] 原生 音频 使用 AppleHDA，包括 耳机
- [x] 内建 麦克风
- [x] 内建 摄像头
- [x] 原生 电源管理
- [x] 电池状态
- [x] 亮度调整平滑过度，保存／恢复 重启依旧有效
- [x] 为包含 OpenCL 的 HD4400 开启加速
- [x] 有线网络
- [x] 不闪屏
- [x] Mac App Store
- [x] Messages/FaceTime（亦可在 10.10.3 上使用，即使我没有照做这个指南：http://www.tonymacx86.com/general-help/110471-how-fix-imessage.html ）

### 已知问题
- **Find My Mac/Locking**：查找我的 Mac 不能正常工作。不要锁定你的 Mac，因为很难（或者不可能）解锁。
- **睡眠／唤醒后 WiFi 连接缓慢**：在 SysPrefs->Energy Saver 禁用 "Wake for network access"。
- **声音**：在初始安装之后的对 kexts 的新增、更新，可能导致声音丢失。

    修复方法：
    + reboot without caches (在 Clover 引导界面按「空格键」，select without caches)
    + 重建缓存
    ```shell
    sudo touch /System/Library/Extensions && sudo kextcache -u /
    ```
    + 正常重启（如果需要，可以重启 2 次）

- **声音**：外部的 headphone/mic 二合一插孔 的 mic 无法工作。
- **CPU 频率**：Clover 识别的 CPU 速度（可以在“About this Mac”看到）不正确。在我的系统中（2.0GHz Core i7-4510u），它显示 2.59GHz。这似乎是修饰过的。你可以通过修改 `config.plist/CPU/FrequencyMHz` 来覆盖它。你会看到我的 `config.plist` 设置中已被注释，将它设置为适合你的 CPU。

### 完成安装后 其他任务
- **触控板**：前往 SysPrefs->Trackpad 选择你喜欢的设置。
- **蓝牙**：如果弹出 Bluetooth Setup Assistant 窗口，前往 SysPrefs->Bluetooth->Advanced 取消所有选项。

### 问题反馈
下载 patchmatic：https://bitbucket.org/RehabMan/os-x-maciasl-patchmatic/downloads/RehabMan-patchmatic-2015-0107.zip  
从 zip 中提取 patchmatic 二进制文件，复制它到 `/usr/bin/`。

```shell
if [ -d ~/Downloads/RehabMan ]; then rm -R ~/Downloads/RehabMan; fi
mkdir ~/Downloads/RehabMan
cd ~/Downloads/RehabMan
patchmatic -extract
```
提醒：使用 copy/paste 比手动键入更简单容易。

上传 Downloads/RehabMan 目录下的文件 (打包 ZIP 文件)。

同样地，上传 ioreg: http://www.tonymacx86.com/audio/58368-guide-how-make-copy-ioreg.html 请使用 IORegistryExplorer v2.1！***不要*** 回复其它版本的 IORegistryExplorer.app 生成的 ioreg。

附带输出：
```shell
kextstat|grep -y acpiplat
kextstat|grep -y appleintelcpu
kextstat|grep -y applelpc
kextstat|grep -y applehda
```

同样地，上传 EFI/Clover 目录（在 Clover 主界面按 F4 键收集）。请删除 themes 目录，尤其是如果你已安装了多个主题的话。

并且，附带以下输出信息：
```shell
sudo touch /System/Library/Extensions && sudo kextcache -u /
```

&nbsp;

### Credits
RehabMan for his repos, tools, guides, and scripts.


---
1. <a id="note-1" href="#ref-1">^</a> 译者：经多方考证『小黑』与它近乎孪生，欣喜若狂，遂译此文  
2. <a id="note-2" href="#ref-2">^</a> 原文：_If you wish, you can reboot to verify a few more items are working (many only partially)._  
3. <a id="note-3" href="#ref-3">^</a> 此处：_已被修补的文件_ 为 `./hotpatch/` 里的文件  
4. <a id="note-4" href="#ref-4">^</a> 原文：_Most changes for 10.12 are already done in the project or have been fixed by Apple in 10.12.1+._  
5. <a id="note-5" href="#ref-5">^</a> 应指：`make && make install` 这步  
6. <a id="note-6" href="#ref-6">^</a> 查看：http://www.insanelymac.com/forum/topic/284989-what-does-oob-mean/
