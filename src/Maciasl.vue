<template>
    <Row type="flex" class="layout" :class="[theme, {init: isInit}]">
        <Row type="flex" ref="maciasl" id="maciasl" class="maciasl">
            <MaciaslMenu ref="menu" :menus="menus" @update="update" :config="config" @destroy="destroy"></MaciaslMenu>

            <Row type="flex" class="layout-container">
                <div class="layout-header"></div>
                <Breadcrumb :data="data"></Breadcrumb>

                <div class="layout-content">
                    <Context ref="context" :data="data"></Context>
                </div>

                <div class="layout-copy"><span>2017 &copy; fansaly</span></div>
            </Row>

            <div class="config">
                <i-switch v-model="config.eye" @on-change="configure"></i-switch>
            </div>
        </Row>

        <Loading ref="loading"></Loading>
    </Row>
</template>

<script>
import Loading from './components/Loading'
import MaciaslMenu from './components/MaciaslMenu'
import Breadcrumb from './components/Breadcrumb'
import Context from './components/Context'

import maciasl from './components/maciasl.json'

const eye = localStorage.getItem('eye') === 'true'
const theme = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'

export default {
    name: 'Maciasl',
    data () {
        return {
            isInit: true,
            config: {
                eye,
                theme
            },
            menus: [],
            data: {}
        }
    },
    components: {
        Loading,
        MaciaslMenu,
        Breadcrumb,
        Context
    },
    watch: {
        config: {
            handler: function () {
                localStorage.setItem('theme', this.config.theme)
                localStorage.setItem('eye', this.config.eye)
            },
            deep: true
        },
        menus: function (val, oldVal) {
            // console.log(val, oldVal)
        }
    },
    methods: {
        getMaciasl () {
            for (let i = 0; i <= maciasl.length - 1; i++) {
                const d = maciasl[i]

                this.tranlateUrl = d

                if (!d.hasMaciasl) {
                    continue
                }

                this.$Loading.start()

                this.axios.get(d.hasMaciasl)
                    .then((response) => {
                        d.text = response.data

                        this.formatItems = d

                        this.$Loading.finish()

                        this.updateMenu(d)
                    })
                    .catch((error) => {
                        console.log(error)
                        this.$Loading.error()
                    })
            }
        },
        updateMenu (data) {
            this.menus.push(data)

            if (this.isInit) {
                setTimeout(() => {
                    this.isInit = false
                }, 800)
            }
        },
        update (o) {
            this.getData = o
            this.data = o.data
        },
        destroy () {
            // console.log(this.$refs.loading)
            this.$refs.loading.$destroy()
        },
        configure (status) {
            if (status) {
                this.config.theme = 'dark'
                this.$Message.info('开启护眼模式')
            } else {
                this.config.theme = 'light'
                this.$Message.info('关闭护眼模式')
            }

            this.config.eye = status
        }
    },
    beforeCreate () {
        // console.log('beforeCreate: ', localStorage)
    },
    computed: {
        theme: {
            get: function () {
                return ('layout-' + this.config.theme)
            }
        },
        getData: {
            get: function () {
                return
            },
            set: function (data) {
                const index = data.index.split(data.symbol)
                const menu = this.menus[index[0]]
                const item = menu.items[index[1]]

                const d = {
                    url: menu.url,
                    domain: menu.domain,
                    author: menu.author,
                    patchName: menu.patchName,
                    hasFile: !!item && !!item.hasFile
                             ? item.hasFile
                             : false
                }

                if (d.hasFile) {
                    d.fileURL = menu.hasMaciasl.replace(/\.maciasl$/, d.hasFile)
                }

                data.data = d
            }
        },
        tranlateUrl: {
            get: function () {
                return
            },
            set: function (data) {
                // http://raw.github.com/RehabMan/Laptop-DSDT-Patch/master
                const reg = /(http(s)?):\/\/([\w\-_]+)\.([\w\-_]+\.[\w\-_]+)+(.*)(\/?)/

                let o = data.maciaslURL.replace(reg, function ($0, $1, $2, $3, $4, $5) {
                    return JSON.stringify({
                        protocol: $1,
                        domain: $4,
                        secondary: $3,
                        remaining: $5
                    })
                })

                o = JSON.parse(o)

                data.domain = o.domain

                if (o.domain === 'github.com') {
                    // https://raw.githubusercontent.com/RehabMan/Laptop-DSDT-Patch/master/.maciasl
                    data.hasMaciasl = `https://${o.secondary}.githubusercontent.com${o.remaining}/.maciasl`

                    // https://github.com/RehabMan/Laptop-DSDT-Patch
                    data.url = `https://${o.domain}${o.remaining.replace(/\/?master$/i, '')}`
                } else {
                    data.hasMaciasl = false
                }
            }
        },
        formatItems: {
            get: function () {
                return
            },
            set: function (data) {
                const d = data.text.split(/\n/)

                for (let i = d.length - 1; i >= 0; i--) {
                    if (!/[^\s]/.test(d[i])) {
                        continue
                    }

                    const o = d[i].replace(/(.*)[\s]+(.*)/, function ($0, $1, $2) {
                        if (!(!!$1 & !!$2)) {
                            return false
                        }

                        return JSON.stringify({
                            name: $1,
                            hasFile: /[^(NullPatch.txt)]/i.test($2)
                                     ? $2
                                     : false
                        })
                    })

                    if (!o) {
                        continue
                    }

                    data.items.push(JSON.parse(o))
                }

                data.items.reverse()

                delete data.text
            }
        }
    },
    mounted () {
        this.getMaciasl()
    }
}
</script>

<style>
.ivu-row-flex {
    flex-wrap: nowrap !important;
}
.layout,
.maciasl {
    position: relative;
    margin: 0 auto;
    width: 100%;
    height: 100%;
}
.maciasl {
    background: #f5f7f9;
}

.ivu-row-flex.layout-container {
    flex-direction: column;
    flex: 1;
    opacity: 1;
    visibility: visible;
    transition: all 1s ease;
}
.init .layout-container {
    opacity: 0;
    visibility: hidden;
    transition-delay: .16s;
}

.layout-content {
    padding-bottom: 90px;
}
.layout-header{
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
}
.layout-breadcrumb{
    padding: 10px 15px 0;
}

.layout-content{
    min-height: 200px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
    flex: 1;
}

.layout-copy{
    text-align: center;
    color: #9ea7b4;
}
.layout-copy span {
    display: inline-block;
    padding: 10px 0 24px;
}

.config {
    position: absolute;
    left: 15px;
    bottom: 8px;
    opacity: 1;
    visibility: visible;
    transition: all .6s .6s ease;
}
.init .config {
    opacity: 0;
    visibility: hidden;
    transform: translateY(50px);
}
.ivu-switch {
    background-color: #579ff9;
    border-color: #579ff9;
}
.ivu-switch:after {
    background-color: #fff;
}
.ivu-switch-checked {
    opacity: .9;
    background-color: #4c5363;
    border-color: #767c8c;
}
.ivu-switch-checked:after {
    background-color: #949494;
}
</style>
