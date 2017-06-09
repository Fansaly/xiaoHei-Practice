```
- 建议不打
+ 建议打上
* 相对修改
--------------------------------------------------------------------------------

DSDT.dsl
    "Rename _DSM methods to XDSM"   ==> rename_DSM.txt
    "IRQ Fix"                       ==> rename_IRQ.txt
    "SMBUS Fix"                     ==> system_SMBUS.txt
    "RTC Fix"                       ==> system_RTC.txt
    "OS Check Fix (Windows 8)"      ==> system_OSYS_win8.txt
-   "AC Adapter Fix"                ==> system_ADP1.txt
    "Fix _WAK Arg0 v2"              ==> system_WAK2.txt
    "Add IMEI"                      ==> system_IMEI.txt

    "7-series/8-series USB"         ==> usb_7-series.txt
    "USB3 _PRW 0x6D (instant wake)" ==> usb_prw_0x6d_xhc.txt

    "Rename GFX0 to IGPU"           ==> graphics_Rename-GFX0.txt
    "Rename B0D3 to HDAU"           ==> graphics_Rename-B0D3.txt

    "Lenovo Z50-70"                 ==> battery_Lenovo-Z50-70.txt
*   "Audio Layout 12"               ==> audio_HDEF-layout.txt

-   "Haswell LPC"                   ==> misc_Haswell-LPC.txt
+   "Replace Names"                 ==> Replace Names.txt


SSDT-0.dsl (=== SSDT.dsl)
    "Rename GFX0 to IGPU"           ==> graphics_Rename-GFX0.txt

SSDT-1.dsl
    "Remove _PSS placeholders"      ==> fix_PSS.txt
    "Rename GFX0 to IGPU"           ==> graphics_Rename-GFX0.txt

SSDT-3.dsl
    "Rename _DSM methods to XDSM"   ==> rename_DSM
    "Rename GFX0 to IGPU"           ==> graphics_Rename-GFX0.txt
    "Rename B0D3 to HDAU"           ==> graphics_Rename-B0D3.txt

*   "Haswell HD4400/HD4600/HD5000"          ==> graphics_Haswell_0a260006.txt
    "Brightness Fix (Haswell/Broadwell)"    ==> graphics_PNLF_haswell.txt

+   "Replace Names"                 ==> Replace Names.txt

SSDT-4.dsl
    "Rename _DSM methods to XDSM"   ==> rename_DSM.txt
    "Rename GFX0 to IGPU"           ==> graphics_Rename-GFX0.txt

+   "Replace Names"                 ==> Replace Names.txt

--------------------------------------------------------------------------------------
"AC Adapter Fix"    to load AppleACPIACAdapter
"Add IMEI"          do not use if your DSDT or SSDTs already have IMEI/HECI/MEI device
"Haswell LPC"       to load AppleLPC
```

### PCBeta remote files (will delete)
    audio.txt
    brightness.txt
    graphics_disable_nv.txt
    graphics_inject_id.txt
    graphics_rename_node.txt
    lpc.txt
    usb.txt
