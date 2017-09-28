<template>
    <Row type="flex" class="aside">
        <Menu :theme="config.theme" @on-select="select">
            <div class="layout-logo-left"></div>

            <!-- 分类 -->
            <Submenu v-for="(menu, menuIndex) in menus" :key="name(menuIndex)" :name="name(menuIndex)">
                <template slot="title">
                    <Icon type="more"></Icon>
                    {{ menu.patchName }}
                </template>

                <!-- 列表 -->
                <Menu-item v-for="(item, itemIndex) in menu.items"
                    :key="name(menuIndex, itemIndex)"
                    :name="name(menuIndex, itemIndex)"
                    :class="{'no-file': !item.hasFile}"
                    :title="item.name">

                    <Icon type="chevron-down" v-if="!item.hasFile"></Icon>
                    <span>{{ item.name }}</span>
                </Menu-item>
            </Submenu>
        </Menu>
    </Row>
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
            return typeof _index !== 'undefined'
                   ? index + this.symbol + _index
                   : index + ''
        },
        select (name) {
            this.$emit('update', {
                index: name,
                symbol: this.symbol
            })
        }
    }
}
</script>
<style>
.aside {
    padding-bottom: 40px;
    width: 22%;
    min-width: 300px;
    opacity: 1;
    visibility: visible;
    transform: none;
    transition: all .3s .1s ease;
    flex-flow: 1;
}
.init .aside {
    opacity: 0;
    visibility: hidden;
    transform: translateX(-100px);
    transition-delay: .16s;
}
.layout-light .aside {
    background-color: #fff;
}
.layout-light .aside:after {
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
    width: 1px;
    height: 100%;
    content: '';
    background-color: #d7dde4;
}
.layout-dark .aside {
    background-color: #464c5b;
}
.aside,
.ivu-menu-vertical .ivu-menu-submenu,
.ivu-menu-vertical .ivu-menu-submenu-title,
.ivu-menu-vertical .ivu-menu-item,
.layout-logo-left,
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item:after {
    position: relative;
    transition: all .5s ease;
}
.ivu-menu-vertical.ivu-menu {
    width: 100% !important;
    min-width: 300px !important;
    height: 100%;
    background-color: transparent !important;
    overflow: auto;
}
.ivu-menu-light.ivu-menu:after {
    width: 0;
    height: 0;
    background-color: transparent;
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
