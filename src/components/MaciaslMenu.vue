<template>
    <Menu :theme="config.theme" @on-select="select">
        <div class="layout-logo-left"></div>

        <!-- 分类 -->
        <Submenu v-for="(menu, menuIndex) in menus" :name="name(menuIndex)">
            <template slot="title">
                <Icon type="more"></Icon>
                {{ menu.patchName }}
            </template>

            <!-- 列表 -->
            <Menu-item v-for="(item, itemIndex) in menu.items"
                :title="item.name"
                :name="name(menuIndex, itemIndex)"
                :class="{'no-file': !item.hasFile}">

                <Icon type="chevron-down" v-if="!item.hasFile"></Icon>
                <span>{{ item.name }}</span>
            </Menu-item>
        </Submenu>
    </Menu>
</template>
<script>
export default {
    name: 'MaciaslMenu',
    props: ['menus', 'config'],
    data () {
        return {
            symbol: ','
        }
    },
    methods: {
        name (index, _index) {
            return  typeof _index !== 'undefied'
                    ? index + this.symbol + _index
                    : index + ''
        },
        select (name) {
            this.$emit('update', {
                index:  name,
                symbol: this.symbol
            })
        }
    }
}
</script>
<style>
.ivu-menu-vertical.ivu-menu:before,
.ivu-menu-vertical .ivu-menu-submenu,
.ivu-menu-vertical .ivu-menu-submenu-title,
.ivu-menu-vertical .ivu-menu-item,
.layout-logo-left,
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item:after {
    position: relative;
    transition: all .5s ease;
}
.ivu-menu-vertical.ivu-menu {
    padding-bottom: 40px;
    width: 22% !important;
    min-width: 300px !important;
    height: 100%;
    background-color: transparent;
    overflow: auto;
    opacity: 1;
    visibility: visible;
    transform: none;
    transition: all .3s .1s ease;
}
.ivu-menu-vertical.ivu-menu:before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    content: '';
}
.ivu-menu-light.ivu-menu:before {
    background-color: #fff;
}
.ivu-menu-dark.ivu-menu:before {
    background-color: #464c5b;
}
.init .ivu-menu-vertical.ivu-menu {
    opacity: 0;
    visibility: hidden;
    transform: translateX(-100px);
    transition-delay: .16s;
}
.layout-logo-left{
    width: 90%;
    height: 30px;
    border-radius: 3px;
    margin: 15px auto;
}
.ivu-menu-light .layout-logo-left{
    background: #fafbfc;
}
.ivu-menu-dark .layout-logo-left{
    background: #5b6270;
}
.ivu-menu-vertical .ivu-menu-submenu {
    background-color: transparent;
}
.ivu-menu-vertical .ivu-menu-submenu .ivu-menu {
    max-height: 400px;
    overflow: auto;
}
.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item {
    padding: 6px 24px !important;
}
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item,
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
    border: none;
}
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item:after {
    position: absolute;
    top: 0;
    right: 0;
    width: 2px;
    height: 100%;
    content: '';
    background-color: transparent;
    transition-duration: .3s;
}
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu):after {
    background-color: #39f;
}
.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item.no-file {
    position: relative;
    margin-top: 4px;
    padding-left: 40px !important;
}
.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item.no-file .ivu-icon {
    position: absolute;
    top: 50%;
    left: 24px;
    margin-top: -6px;
    font-size: 12px;
}
.ivu-menu-item > span {
    overflow: hidden;
    white-space: normal;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    display: -moz-box;
    -webkit-line-clamp: 1;
    -moz-line-clamp: 1;
    -webkit-box-orient: vertical;
    -moz-box-orient: horizontal;
}
</style>