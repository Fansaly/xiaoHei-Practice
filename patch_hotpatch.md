> 译自：[[Guide] Lenovo Z50-70/Z40-70/G50-70/G40-70 using Clover UEFI](https://www.tonymacx86.com/threads/guide-lenovo-z50-70-z40-70-g50-70-g40-70-using-clover-uefi.261787/)  
> 作者：[the-braveknight](https://www.tonymacx86.com/members/the-braveknight.1466999/)  
> 更于：Oct 5, 2018 at 2:34 PM

---

### 概述
此指南旨在引导在 Lenovo Z50-70<sup id="ref-1">[[1]](#note-1)</sup>/Z40-70 或者 G50-70/G40-70 笔记本电脑上，一步接一步地安装 Mojave（ High Sierra、Sierra、El Capitan ）。

我的是一款搭载 Broadcom BCM94352Z 无线网卡和 SSD 硬盘的 Z50-70 笔记本电脑。

或许你已经知道，Lenovo 的 BIOS 中含有 WiFi 白名单，在安装与 macOS 兼容的无线网卡之前，必须先攻克它。

### 所需设备
- Lenovo Z50-70/Z40-70 或者 G50-70/G40-70
- 在 Mac App Store 中下载 macOS Mojave 或者 High Sierra 或者 Sierra 亦或者 El Capitan
- 8GB 的 U盘
- 支持原生 WiFi/BT 的 Broadcom BCM94352Z

### BIOS 设置
恢复 BIOS 到默认状态，并确认
- UEFI Boot: Enabled
- Secure Boot: Disabled
- 启用 Legacy Boot (but UEFI first)，这样在启动时可以有效地减少“花屏”

提醒：如果你的笔记本电脑有独立显卡（Nvidia），请在 BIOS 中保持启用状态。它会在 macOS 运行时，被 SSDT-Z50.aml（或者 SSDT-G50.aml）自动禁用。

### 准备 USB、开始安装
依照这篇指南创建带有 Clover UEFI 的 USB 安装设备，该方法非常适合此款笔记本：https://www.tonymacx86.com/el-capitan-laptop-support/148093-guide-booting-os-x-installer-laptops-clover.html

**特别提醒：**
- 使用 `createinstallmedia` 方法。可以很稳定地完成任务，几乎不会出错。> [[Guide] Booting the OS X Installers on LAPTOPS with Clover](https://www.tonymacx86.com/el-capitan-laptop-support/148093-guide-booting-os-x-installer-laptops-clover.html)

- 一定要将 RealtekRTL8111.kext 复制到 `Clover/kexts/Other`，作为「[安装完成后](#安装完成后)」必要的网络支持。本指南的其余部分同样也依赖于它才能完成。此外，也可以复制 FakePCIID.kext 和 FakePCIID_Broadcom_WiFi.kext 到 `Clover/kexts/Other`，这样可以启用已安装好的兼容无线网卡。

    提醒：FakePCIID.kext 和 FakePCIID_Broadcom_WiFi.kext 可从这里获取：https://github.com/RehabMan/OS-X-Fake-PCI-ID

- 因为有一些笔记本使用的是 ELAN 触控板，所以 RehabMan 的 VoodoPS2Controller.kext 或许不能使它正常工作，因此可从 Z50 仓库下载 ELAN 的 kext 以备用。

- 自让 USB 良好工作的 AppleUSBXHCI.kext 诞生起，GenericUSBXHCI.kext 对于这款笔记本已不再是必需的了，并且 GenericUSBXHCI.kext 在 10.11+ 上不能正常工作，因此不应该再使用它了。

- 使用 Lenovo 仓库提供的 config_install.plist：https://github.com/the-braveknight/Lenovo-X50-macOS

### 安装完成后
按照上一节提到的指南（post #2）中的描述安装 Clover UEFI。之后，安装 Clover 并正确配置（config.plist，kexts 等），就可以从 HDD/SSD 启动了。

但仍然有许多问题和无法正常工作的设备。为此，我们需要修补 DSDT、提供一个合适的 config.plist，以及安装所需的 kext。

因为已由 Clover 注入了 RealtekRTL8111.kext，所以现在只需使用网线连接到路由器即可访问互联网。插入网线，并确保可以访问互联网后，再继续之后的任务。同样，如果你使用了 FakePCIID_Broadcom_WiFi.kext，那么可以在连接到 WiFi 路由器后继续。

这里有一些安装用的工具，和为了更容易打补丁而提供的脚本、工具：https://github.com/the-braveknight/Lenovo-X50-macOS

首先，必须安装开发者工具。运行 Terminal 输入：
```bash
git
```

系统会提示你安装开发者工具。因为已经可以访问互联网了，所以选择下载并自动安装。  
开发者工具安装完成之后，我们需要在本地创建一个 GitHub 上的项目的副本。
```bash
mkdir ~/Projects
cd ~/Projects
git clone https://github.com/the-braveknight/Lenovo-X50-macOS lenovo.git
```
接下来，安装更多的工具和所需要的 kext ...  
下载 kext 和工具：
```bash
cd ~/Projects/lenovo.git
./X50.sh --download-requirements
```
安装：
```bash
./X50.sh --install-downloads
```

`--download-requirements` 参数让脚本将自动从 bitbucket、github 收集最新版本的工具（patchmatic、iasl、MaciASL）和 kext（FakeSMC.kext、ACPIBatteryManager.kext，等等），以及从 [RehabMan's repo](https://github.com/RehabMan/OS-X-Clover-Laptop-Config) 获取所需要的 hotpatch SSDTs。  
`--install-downloads` 参数让脚本会自动将它们安装到正确位置。

如果你愿意，现在可以重启笔记本电脑，以验证更多的硬件已经正常工作（很多只是部分）。

要完成这一步，我们需要被打上正确补丁的 ACPI。

对于 Z50-70/Z40-70 型号：
```bash
cd ~/Projects/lenovo.git
make
make install_z50
```

对于 G50-70/G40-70 型号：
```bash
cd ~/Projects/lenovo.git
make
make install_g50
```

`make` 用来编译打好补丁的文件（需要 iasl），生成的文件位于目录 `./build`。

最终的 `make install_z50`（或者 `make install_g50`），先是挂载 EFI 分区，再复制编译生成的文件到 `EFI/Clover/ACPI/patched` 以使 Clover 加载它们。

### 电源管理
以上步骤已经安装了 CPU/IGPU 电源管理所需的一切。不再需要使用 ssdtPRgen.sh 脚本了。

此外，请注意，hackintosh 不支持 _写入到磁盘_ 或 _S4_ 的休眠模式。

你需要禁用它：
```bash
sudo pmset -a hibernatemode 0
sudo rm /var/vm/sleepimage
sudo mkdir /var/vm/sleepimage
```
即使我们巧妙地使用了一个同名的目录来帮助我们禁用它，但是每当系统更新后往往会重新启用它，因此每次系统更新完成之后都需要检查并禁用它。

### 最终的 config.list
直到现在，使用的都是安装时的 config.plist。在所有 ACPI 文件就绪之后（往前两步），就可以使用 lenovo 仓库中的 config.plist 作为最终的 config.plist 了。

```bash
cd ~/Projects/lenovo.git
./X50.sh --install-config
```

将 config.plist 从仓库复制到 `EFI/Clover/config.plist` 之后，应该自定义 SMBIOS，使它拥有唯一的 Serial。可以使用 Clover Configurator（使用 google 查找／下载 它）生成。***不要*** 使用 Clover Configurator 编辑实际使用的 config.plist，而是编辑一个“暂存” config.plist 来存储 SMBIOS 数据，然后使用 plist 编辑器（我使用的 Xcode）复制／粘贴 将 SMBIOS 部分复制到实际使用的 config.plist 中。Clover Configurator 有太多的 bug，不能信任它对 config.plist 的编辑结果。本指南使用 MacBookAir6,2，不要使用其他型号。

重申：***不要使用 Clover Configurator 编辑你的 config.plist***。它可能会删除 config.plist 中的重要设置，导致异常。

&nbsp;

### 请继续阅读
尽管大部分任务都已完成，但请继续阅读本指南，还有一些重要的信息你应该知道。

请务必查看「[已知问题](#已知问题)」，特别是其中“音频”部分的说明。通常，即使在完成上述所有任务之后，声卡也不会在第一次重启后工作。你必须依照该部分中的具体说明，才能获取缓存中声卡对应的 kext。

如有问题出现，附上必要的文件，在「[问题反馈](#问题反馈)」中询问，如果没有“要求的文件”，那么请不要打扰我。

### BIOS 模块修改 - 为了安装使用兼容的无线网卡
这款笔记本的 BIOS 中含有 WiFi 白名单，在安装与 macOS 兼容的无线网卡之前，必须先攻克它。  
详细内容请查看指南：https://www.tonymacx86.com/el-capitan-laptop-support/187340-guide-lenovo-g50-70-z50-70-bios-whitelist-removal.html

### WiFi - BCM94352Z (DW1560)
仓库中的脚本均已更新，并且会安装 BCM94352Z 所必需的 kext。

### WiFi - BCM943602BAED (DW1830)
这张网卡几乎和原生的一摸一样，它与原始 Mac（Bcm4360）中的芯片相同，已经过 OOB<sup id="ref-2">[[2]](#note-2)</sup> 的验证，FakePCIID 就可以获取到它的 AirPort 标识。在 macOS Sierra (10.12) 中，它不像 Bcm4352 网卡那样需要 5GHz 或者 fcvo 补丁。

注意：此卡需要设置第三个天线才能正常工作。

### 项目库的更新
时不时地，会将未来可用或优化设置更新到 lenovo 仓库。此时，你可能需要更新你的副本，用来给 ACPI 重新打补丁。

缘于你使用 git, 所以这很简单 ...
```bash
cd ~/Projects/lenovo.git
./X50.sh --update # to save any local changes you might have made and update repo to latest
./X50.sh --download-requirements
./X50.sh --install-downloads
./X50.sh --update-config
make clean
make
make install_z50 # or make install_g50
```

&nbsp;

### 正常运行
- [x] UEFI 启动 通过 Clover
- [x] 内建 键盘（Fn 功能键可用）
- [x] 内建 触控板（基本手势）
- [x] HDMI 视频／音频，支持热插拔
- [x] AirPlay 镜像到 AppleTV
- [x] 原生 WiFi 通过 BCM943602BAED
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
- [x] Mac App Store 可用
- [x] 屏幕不闪烁
- [x] Messages/FaceTime（尽管我没有照做 [这个指南](https://www.tonymacx86.com/general-help/110471-how-fix-imessage.html)，但它甚至可以让其在 10.10.3 上使用）

### 已知问题
- **Find My Mac/Locking**：查找我的 Mac 不能正常工作。不要锁定你的 Mac，因为很难（或者不可能）解锁。
- **睡眠／唤醒后 WiFi 连接迟缓**：在 SysPrefs->Energy Saver 禁用 "Wake for network access"。
- **音频**：在初次安装或者新增、更新 kext 之后，可能导致声卡未加载。

    修复方法：
    + reboot without caches (在 Clover 界面按「空格键」，select without caches)
    + 重建缓存
    ```bash
    sudo touch /System/Library/Extensions && sudo kextcache -u /
    ```
    + 正常重启（如果需要，可以重启多次）

- **CPU 频率**：Clover 识别的 CPU 速度（可以在 About This Mac 看到）不正确。在我的系统中（2.0GHz Core i7-4510u），它显示 2.59GHz。这似乎是修饰过的。可以通过修改 `config.plist/CPU/FrequencyMHz` 来覆盖它。你会看到在 `config.plist` 中我已把它注释掉了，启用并设置它以适合你的 CPU。

### 安装完成后 其他任务
- **触控板**：一定要前往 SysPrefs->Trackpad 查看，并根据你的喜好设置它们。
- **蓝牙**：如果弹出 Bluetooth Setup Assistant 窗口，前往 SysPrefs->Bluetooth->Advanced 取消所有选项。

&nbsp;

### 问题反馈
下载 patchmatic：https://bitbucket.org/RehabMan/os-x-maciasl-patchmatic/downloads/RehabMan-patchmatic-2015-0107.zip  
从 zip 中提取 patchmatic 二进制文件，复制它到 `/usr/bin/`。

```bash
if [ -d ~/Downloads/RehabMan ]; then rm -R ~/Downloads/RehabMan; fi
mkdir ~/Downloads/RehabMan
cd ~/Downloads/RehabMan
patchmatic -extract
```
提醒：使用 copy/paste 比手动键入更方便一些。

上传 Downloads/RehabMan 目录下的文件 (打包好的 ZIP 文件)。

同样地，上传 ioreg: https://www.tonymacx86.com/audio/58368-guide-how-make-copy-ioreg.html 请使用 IORegistryExplorer v2.1！***不要*** 回复其它版本的 IORegistryExplorer.app 生成的 ioreg。

附带输出：
```bash
kextstat|grep -y acpiplat
kextstat|grep -y appleintelcpu
kextstat|grep -y applelpc
kextstat|grep -y applehda
```

同样地，上传 EFI/Clover 目录（在 Clover 主界面按 F4 键收集）。请剔除 themes 目录，特别是如果你安装了过多的主题时。

并附带以下输出信息：
```bash
sudo touch /System/Library/Extensions && sudo kextcache -u /
```

&nbsp;

### Credits
RehabMan for his repos, tools, guides, and scripts.


---
1. <a id="note-1" href="#ref-1">^</a> 译者注: 多方考证，『小黑』与它近乎孪生，遂译此文  
2. <a id="note-2" href="#ref-2">^</a> 请查看: http://www.insanelymac.com/forum/topic/284989-what-does-oob-mean/
