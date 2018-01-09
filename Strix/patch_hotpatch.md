> 译自：[Skylake-X/X299 - Live the Future now on macOS High Sierra 10.13 - [Successful Build/Extended Guide]](https://www.tonymacx86.com/threads/skylake-x-x299-live-the-future-now-on-macos-high-sierra-10-13-successful-build-extended-guide.229353/)  
> 作者：[kgp](https://www.tonymacx86.com/members/kgp.1167394/)  
> 更于：Jan 7, 2018 at 1:18 AM

---

![](https://www.tonymacx86.com/attachments/cover-nice-small-png.303228/)

在运行 Skylake-X/X299 的设备上，升级 macOS High Sierra 10.13.2 成功!

![](https://www.tonymacx86.com/attachments/imacpro-overview-png.303229/)

这原本是为 Skylake-X/X299 而撰写构建 macOS High Sierra 10.13 Desktop 的指南 ，当然，通过反馈仍能继续使它成长和改善。此指南基于 ASUS Prime X299 Deluxe（虽然最初测试是用 Gigabyte X299 Aorus Gaming 9 进行的，也因此在我的指南中会有它的介绍）。然而，其他 ASUS X299 型号的主板，或着其他品牌的 X299 主板也应该与本指南兼容，考虑进去下面一些必要的修改。选择 i7-7800X（6 核）作为 Skylake-X **启动配置模型**，是为了最小化指导开发成本。在目标配置中它已经被替换为 i9-7980XE（18 核）的了。与本指南兼容的所有其他 Skylake-X 型号在下图中详细说明。

![](https://www.tonymacx86.com/attachments/skylake-x-guide-compatibility-png.276347/)

请仔细考虑，根据具体需求正确选择 Skylake-X 的型号。包括以下限制说明：

+ a.) i7-7640X 和 7740X 仅支持双通道 DDR4-2666，只支持 16 个 PCI Express 3.0 通道，可它已经被最先进的 16 通道 PCIe 图形适配器使用完了。因此，已经没有 PCI Express 3.0 通道给 PCIe NVMe 驱动器或额外的 PCIe 适配器使用！

+ b.) i7-7800X 和 i7-7820X 已经支持四通道的 DDR4-2666，但是也只有 28 个 PCI Express 3.0 通道！因此，使用最先进的 16 通道 PCIe 图形适配器和 PCIe NVMe 驱动器后，几乎没有 PCI Express 3.0 通道了。当添加一个或两个 PCIe 适配器时，也就超过了 28 个可用的 PCI Express 3.0 通道！在这种情况下，由此产生的配置可能更容易出错！

+ c.) 因此，考虑到 a.) 和 b.) ，我强烈建议至少使用 i9-7900X，它已经支持四个通道 DDR4-2666，并实现了 44 个 PCI Express 3.0 通道。

