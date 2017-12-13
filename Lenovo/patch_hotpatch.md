> 译自：[[Guide] Lenovo Z50-70/Z40-70 using Clover UEFI](https://www.tonymacx86.com/threads/guide-lenovo-z50-70-z40-70-using-clover-uefi.232823/)  
> 作者：[the-braveknight](https://www.tonymacx86.com/members/the-braveknight.1466999/)  
> 更于：Dec 7, 2017 at 10:13 PM

---

### 概述
本文目的是提供安装 High Sierra、Sierra、El Capitan 的分步指南。此指南适用于联想 Z50-70<sup id="ref-1">[[1]](#note-1)</sup> 和 Z40-70。

我的机型：一款 Z50-70，搭载 Broadcom BCM943602BAED 无线网卡和 SSD 硬盘。

这款笔记本的 BIOS 中含有 WiFi 白名单，为了即将安装的 OS X 兼容无线网卡，我们必须先攻克它。另一种可能是使用 AR9565，一些 Z50-70/Z40-70 的 BIOS 白名单中已包含它。安装脚本已经更新，以便为搭载的 Wi-Fi 安装适当的 kext。

如果你正在安装 Sierra 或 El Capitan，预计你会在这里阅读指南，但请在 El Capitan 帖子上提问。这个帖子只能用于 High Sierra 提问。

### 所需设备
- 联想 Z50-70 或者 Z40-70
- 从 Mac App Store 中下载获得的 macOS High Sierra、Sierra、El Capitan
- 8GB 的 U盘
- （首选）Broadcom BCM943602BAED 或者 BCM94352Z，无线／蓝牙
- Atheros AR9565 (使用 Lilu.kext + ATH9KFixup.kext)，无线

### BIOS 设置
设置 BIOS 为 Windows 默认，并确认：
- UEFI Boot 状态 Enabled
- Secure Boot 状态 Disabled
- 启用 Legacy Boot (but UEFI first)，这样在启动时可以有效地减少“花屏”

提醒：如果你的笔记本电脑有独立显卡（Nvidia），请在 BIOS 中保持启用状态。在运行 OS X 时，它将被 SSDT-NVDA.aml 自动禁用。

### 准备 USB、开始安装
依照这篇指南创建使用 Clover UEFI 的 USB 和之后的安装，对于此款笔记本电脑也非常适用：https://www.tonymacx86.com/el-capitan-laptop-support/148093-guide-booting-os-x-installer-laptops-clover.html

**特别提醒：**
- 使用 `createinstallmedia` 方法。它可以很好的完成任务，并且产生错误的几率很小。这种方法同时也为你提供了一个 OS X 恢复分区。前往查看 RehabMan 的详细指南 > [[Guide] Booting the OS X Installers on LAPTOPS with Clover](https://www.tonymacx86.com/el-capitan-laptop-support/148093-guide-booting-os-x-installer-laptops-clover.html)

- 一定要将 RealtekRTL8111.kext 复制到 Clover/kexts/Other，作为「[完成安装后](#完成安装后)」的网络支持是很有帮助的。本指南的其余部分也依赖于它。一种是复制 FakePCIID.kext 和 FakePCIID_Broadcom_WiFi.kext 到 Clover/kexts/Other，另一种，如果你是 AR9565，复制 Lilu.kext 以及 ATH9KFixup.kext + ATH9KInjector.kext。这些将启用已安装好的兼容无线网卡。

    提醒：FakePCIID.kext 和 FakePCIID_Broadcom_WiFi.kext 在这里获取：https://github.com/RehabMan/OS-X-Fake-PCI-ID ，Lilu.kext 在这里获取：https://github.com/RehabMan/Lilu ，ATH9KFixup.kext 和 ATH9KInjector.kext 在这里获取：https://github.com/RehabMan/ATH9KFixup

- 有一些笔记本使用的是 ELAN 触控板，RehabMan 的 VoodoPS2Controller.kext 不能使它正常运作。从 Z50 仓库下载 ELAN 的 kext 以备用。

- 自让 USB 可以更好工作的 AppleUSBXHCI.kext 诞生起，GenericUSBXHCI.kext 对这款笔记本不再是必需的了。并且 GenericUSBXHCI.kext 在 10.11+ 上不能正常工作，因此不再使用它了。

- 使用 Z50 仓库的 config_install.plist：https://github.com/the-braveknight/Lenovo-Z50-DSDT-Patch/raw/master/config_install.plist

### 完成安装后
按照上一节链接的指南（post #2）中的说明安装 Clover UEFI。安装 Clover 并正确配置（config.plist，kexts 等）后，应该可以从 HDD/SSD 启动了。

但仍然有许多问题和设备无法正常工作。为此，我们需要修补 DSDT，提供一个合适的 config.plist，并安装所需的 kext。

由于已经注入了 Clover 的 RealtekRTL8111.kext，你应该只需使用网线连接到路由器，即可访问互联网。插入网线，并确保可以连接互联网，然后再继续。或者，如果你使用了 FakePCIID_Broadcom_WiFi.kext，则可以在继续之前连接到你的 WiFi 路由器。

一些安装用的工具，以及为了更容易打补丁而提供的脚本、工具，都在仓库：https://github.com/the-braveknight/Lenovo-Z50-DSDT-Patch

首先，必须安装开发者工具。运行 Terminal 输入：
```shell
git
```

系统会提示你安装开发者工具。之前已经连接到了互联网，你可以选择下载并自动安装。  
开发者工具安装完成之后，我们需要在本地创建一个 GitHub 上的项目的副本。
```shell
mkdir ~/Projects
cd ~/Projects
git clone https://github.com/the-braveknight/Lenovo-Z50-DSDT-Patch.git z50.git
```
接下来，安装一些更多的工具和所需要的 kexts ...  
下载 kexts 和工具：
```shell
cd ~/Projects/z50.git
./download.sh
```
安装：
```shell
./install_downloads.sh
```

`download.sh` 脚本将自动从 bitbucket 收集最新版本的工具（patchmatic、iasl、MaciASL）和 kexts（IntelBacklight.kext、ACPIBatteryManager.kext，等等）。`install_download.sh` 会自动将它们安装到正确位置。

如果你愿意，可以重新启动，以验证更多的硬件已经正常工作（很多只是部分）。

要完成这一步，我们需要被打上正确补丁的 DSDT/SSDT。

此项目不使用打好修补的 DSDT/SSDTs，而是使用 Clover hotpatches 和一组较小的 SSDTs。
```shell
cd ~/Projects/z50.git
make
make install
```
`make` 脚本用来编译打好补丁的文件<sup id="ref-2">[[2]](#note-2)</sup>（需要 iasl），生成的文件位于目录 `./build`。

最后，`make install` 脚本先是挂载 EFI 分区，再复制上一步生成的文件到 `EFI/Clover/ACPI/patched` 以使 Clover 加载它们。

### 电源管理
以上步骤已经安装了 CPU/IGPU 电源管理所需的一切。不再需要使用 ssdtPRgen.sh 脚本了。

此外，请注意，hackintosh 不支持 _写入到磁盘_ 或 _S4_ 的休眠模式。

你需要禁用它：
```shell
sudo pmset -a hibernatemode 0
sudo rm /var/vm/sleepimage
sudo mkdir /var/vm/sleepimage
```
即使巧妙地使用了一个同名目录来帮助我们禁用它，但是系统更新后往往会重新启用，因此在每次更新之后要检查休眠模式并禁用它。

### 最终的 config.list
到目前为止，一直使用的是用于安装的 config.plist。在所有 ACPI 文件就绪之后（往前两部分<sup id="ref-3">[[3]](#note-3)</sup>），就可以使用 Z50 仓库中最终的 config.plist 了。

首先，挂载 EFI 分区：
```shell
cd ~/Projects/z50.git
./mount_efi.sh /
```
之后，复制文件：
```shell
cd ~/Projects/z50.git
cp config.plist /Volumes/EFI/EFI/Clover/config.plist
```
将 config.plist 从仓库复制到 EFI/Clover/config.plist 之后，应该自定义 SMBIOS，使它拥有唯一的 Serial。可以使用 Clover Configurator（使用 google 查找／下载 它）生成。***不要*** 使用 Clover Configurator 编辑真实的 config.plist，而是编辑一个“虚假”的 config.plist 来存储 SMBIOS 数据，然后使用 plist 编辑器（我使用的 Xcode）复制／粘贴 将 SMBIOS 部分复制到正在使用的 config.plist 中。Clover Configurator 有很多 bug，因此不要完全信任它对 config.plist 的编辑结果。本指南使用 MacBookAir6,2，不要使用其他型号。

重申：***不要使用 Clover Configurator 编辑你的 config.plist***。它可能会删除 config.plist 中重要的设置，导致异常。

&nbsp;

### 请继续阅读
尽管大部分任务都已完成，但请继续阅读本指南，还有一些重要的信息你应该知道。

请务必访问「[已知问题](#已知问题)」，特别是其中“音频”部分的说明。通常，即使在完成上述所有任务之后，声卡也不会在第一次重启后工作。你必须按照该部分中的具体说明，才能获取缓存中声卡对应的 kexts。

如有问题出现，请仅附带上必要的文件，在「[问题反馈](#问题反馈)」中询问。

### BIOS 模块兼容 WiFi 的安装
这款笔记本的 BIOS 中含有 WiFi 白名单，为了使将要安装的 OS X 兼容无线网卡，我们必须先攻克它。  
详细内容请查看指南：https://www.tonymacx86.com/el-capitan-laptop-support/187340-guide-lenovo-g50-70-z50-70-bios-whitelist-removal.html

### WiFi 使用 BCM94352Z
`./download.sh` 和 `./install_downloads.sh` 脚本均已得到更新，并且会安装 BCM94352Z 所必需的 kexts。

`config.list` 中已包含 5GHz WiFi 和 蓝牙 Handoff 所需的补丁。我们使用 the-darkvoid 提供的，在 US/FCC 状态下的 5GHz 补丁。如果你的（Country Code）不是 US，你可能需要考虑其它补丁。查看这里：https://www.tonymacx86.com/network/104850-guide-airport-pcie-half-mini-v2.html

### WiFi 使用 BCM943602BAED (DW1830)
这张网卡几乎和原生的一摸一样，它与原始 Mac（BCM4360）中的芯片相同，已经过 OOB<sup id="ref-4">[[4]](#note-4)</sup> 的验证，FakePCIID 可以使用与之相应的 AirPort 标识。在 macOS Sierra (10.12) 中，它不像 BCM4352 网卡那样需要 5GHz 或者 fcvo 补丁。

### WiFi 使用 Atheros AR9565
初始增加以 ATH9KFixup.kext 驱动的一些支持 Z50-70/Z40-70 的 Atheros AR9565 无线网卡，为那些不想给 BIOS 提取／打补丁 的。

安装脚本已被修改，以便为 Broadcom（BCM94352Z 或 BCM943602BAED）和 Atheros AR9565 无线网卡安装必要的 kext。

### 项目库的更新
有时会更新一些有用的到远程项目库。所以，你可能需要更新你的副本，用来重新给 DSDT/SSDT 打补丁。

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
- [x] UEFI 启动，通过 Clover
- [x] 内建 键盘（Fn 组合键可用）
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
- **音频**：在初始安装之后的对 kexts 的新增、更新，可能导致声音丢失。

    修复方法：
    + reboot without caches (在 Clover 引导界面按「空格键」，select without caches)
    + 重建缓存
    ```shell
    sudo touch /System/Library/Extensions && sudo kextcache -u /
    ```
    + 正常重启（如果需要，可以重启 2 次）

- **音频**：通过 headphone/mic 二合一插孔外接的 mic 不能工作。
- **CPU 频率**：Clover 识别的 CPU 速度（可以在 About This Mac 看到）不正确。在我的系统中（2.0GHz Core i7-4510u），它显示 2.59GHz。这似乎是修饰过的。可以通过修改 `config.plist/CPU/FrequencyMHz` 来覆盖它。在 `config.plist` 中你会看到我已将其注释，重新设置它以适合你的 CPU。

### 完成安装后 其他任务
- **触控板**：一定要前往 SysPrefs->Trackpad 查看，并根据你的喜好设置它们。
- **蓝牙**：如果弹出 Bluetooth Setup Assistant 窗口，前往 SysPrefs->Bluetooth->Advanced 取消所有选项。

### 升级到 High Sierra
正如你可能已经知道的那样，High Sierra 有一个叫做 APFS 的新文件系统。如果以默认方式启动 High Sierra 安装程序（例如，运行 `/Applications/Install macOS High Sierra.app`），SSD 上的启动驱动器将自动转换为 APFS。

如果你打算使用 APFS 文件系统，请不要忘记将 apfs.efi 添加到 `EFI/CLOVER/drivers64UEFI`。如果 **在 `drivers64UEFI` 中没有 apfs.efi，Clover 将无法识别 APFS** 启动卷。你可以在 `/usr/standalone/i386/apfs.efi` 找到 apfs.efi，位于 `"/Applications/Install macOS High Sierra.app/Contents/SharedSupport/BaseBinaries.dmg"`。

但是，如果你想坚持使用 HFS+，你可以避免转换到 APFS。为此，请勿使用安装 macOS High Sierra.app 来启动安装程序。改用 `startosinstall`：
```shell
/Applications/"Install macOS High Sierra.app"/Contents/Resources/startosinstall --converttoapfs NO
```

### 问题反馈
下载 patchmatic：https://bitbucket.org/RehabMan/os-x-maciasl-patchmatic/downloads/RehabMan-patchmatic-2015-0107.zip  
从 zip 中提取 patchmatic 二进制文件，复制它到 `/usr/bin/`。

```shell
if [ -d ~/Downloads/RehabMan ]; then rm -R ~/Downloads/RehabMan; fi
mkdir ~/Downloads/RehabMan
cd ~/Downloads/RehabMan
patchmatic -extract
```
提醒：使用 copy/paste 比手动键入更方便一些。

上传 Downloads/RehabMan 目录下的文件 (打包 ZIP 文件)。

同样地，上传 ioreg: https://www.tonymacx86.com/audio/58368-guide-how-make-copy-ioreg.html 请使用 IORegistryExplorer v2.1！***不要*** 回复其它版本的 IORegistryExplorer.app 生成的 ioreg。

附带输出：
```shell
kextstat|grep -y acpiplat
kextstat|grep -y appleintelcpu
kextstat|grep -y applelpc
kextstat|grep -y applehda
```

同样地，上传 EFI/Clover 目录（在 Clover 主界面按 F4 键收集）。请剔除 themes 目录，特别是如果你安装了过多的主题时。

并且，附带以下输出信息：
```shell
sudo touch /System/Library/Extensions && sudo kextcache -u /
```

&nbsp;

### Credits
RehabMan for his repos, tools, guides, and scripts.


---
1. <a id="note-1" href="#ref-1">^</a> 译者：经多方考证『小黑』与它近乎孪生，欣喜若狂，遂译此文  
2. <a id="note-2" href="#ref-2">^</a> 此处：_打好补丁的文件_ 在 `./hotpatch/` 下  
3. <a id="note-3" href="#ref-3">^</a> 应指：`make && make install` 这步  
4. <a id="note-4" href="#ref-4">^</a> 查看：http://www.insanelymac.com/forum/topic/284989-what-does-oob-mean/
