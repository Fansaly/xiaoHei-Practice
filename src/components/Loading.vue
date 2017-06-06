<template>
    <!-- 加载层 -->
    <Row id="loading">
        <Col class="demo-spin-col" span="24">
            <Spin fix>
                <div class="loader">
                    <svg class="circular" viewBox="25 25 50 50">
                        <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10"></circle>
                    </svg>
                </div>
            </Spin>
        </Col>
    </Row>
</template>
<script>
export default {

}
</script>
<style>
#loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: all .6s ease;
}
.init #loading {
    opacity: 1;
}
.demo-spin-col {
    height: 100%;
    position: relative;
}
#loading .ivu-spin-fix {
    background-color: rgba(0,0,0,.08);
}
.ivu-spin-text {
    margin-top: -100px;
}

.loader {
    width: 60px;
    height: 60px;
    position: relative;
    margin: 0 auto
}
.circular {
    animation: rotate 2s linear infinite;
    height: 100%;
    transform-origin: center center;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto
}
.path {
    stroke-dasharray: 1,200;
    stroke-dashoffset: 0;
    animation: dash 1.5s ease-in-out infinite,
               color 6s ease-in-out infinite;
    stroke-linecap: round
}
@keyframes rotate {
    to {
        transform: rotate(1turn)
    }
}
@keyframes dash {
    0% {
        stroke-dasharray: 1,200;
        stroke-dashoffset: 0
    }
    50% {
        stroke-dasharray: 89,200;
        stroke-dashoffset: -35
    }
    to {
        stroke-dasharray: 89,200;
        stroke-dashoffset: -124
    }
}
@keyframes color {
    0%,to {
        stroke: #d62d20
    }
    40% {
        stroke: #0057e7
    }
    66% {
        stroke: #008744
    }
    80%,90% {
        stroke: #ffa700
    }
}
@keyframes ani-app-loading {
    0% {
        transform: rotate(0deg)
    }
    50% {
        transform: rotate(180deg)
    }
    to {
        transform: rotate(1turn)
    }
}
</style>
