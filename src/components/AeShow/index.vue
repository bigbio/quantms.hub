<template>
  <div v-show="showImg" class="content-box">
    <div class="info">
      <div class="info-content">
        <h1>Organism: <span>Homo sapiens</span></h1>
        <el-switch
          v-model="showBar"
          class="ml-2"
          inline-prompt
          style="
              --el-switch-on-color: #13ce66; 
              --el-switch-off-color: #ff4949;
              position: absolute;
              "
          active-text="Bar"
          inactive-text="Box"
          @change = "changeShowBar"
        />
        <el-switch
          v-model="showLabel"
          class="ml-2"
          inline-prompt
          v-show="showBar"
          style="
              --el-switch-on-color: #13ce66; 
              --el-switch-off-color: #ff4949;
              position: absolute;
              left: 5.5rem;
              "
          active-text="Show label"
          inactive-text="Off label"
          @change = "changeShowLabel"
        />
      </div>
      
      <!--tags-->
      <div class="button-tag">
          <el-tag v-for="(item,index) in proteinTags" :key="index" round closable :color="tagsColor[index]" @close="handleClose(item)">{{ item }}</el-tag>
      </div>
      <!--history-->
      <div class="history">
        <el-text style="margin-right: 16px;" class="history-info" type="info" @click="drawer = true">
          history
        </el-text>
        <el-drawer v-model="drawer" title="I am the title" :with-header="false">
          <el-tabs tab-position="right" style="height: 300px" class="demo-tabs" v-for="(item,index) in imgs" :key="index">
            <h5>{{ item.proteinName.join() }}</h5>
            <el-image style="width: 100%;" :src="item.url" fit="fill" :preview-src-list="[item.url]" />
          </el-tabs>
        </el-drawer>
      </div>
    </div>
    <div class="card">
      <div ref="chart" v-bind:style="{width: 100 + '%', height: imgH + 'px'}"></div>
    </div>

  </div>
</template>
<script setup>
import { getProteins,getCellLineProteins } from '@/api/search'
import { inflate } from 'pako'
import * as echarts from 'echarts'
import {useRouter, onBeforeRouteUpdate} from "vue-router";
import { ref, onMounted, nextTick,computed } from 'vue'
import {getBoxTooltips,options} from './option'
const router = useRouter();
const drawer = ref(false)
const emit = defineEmits(['changeLoading'])
// image height
let imgH = 500
// database
let proteinTable = []
const showBar = ref(false)
const showLabel = ref(false)
// component show
const showImg = ref(false)
// data history 
const dataHistory = ref([])
// current router name
const routerName = ref('')
// query protein
const protein = ref([])
// sorted tags 
const sortTags = ref([])
// tags
const proteinTags = ref([])
const tags = computed(() => {
  return proteinTags.value.map((item)=>item.split('(')[0])
})
// tags color
const tagsColor = ["#8DD3C7", "#EDBC63", "#BEBADA", "#FB8072", "#80B1D3"]
// map html
const chart = ref()
// history
const imgs = ref([])
// image object
let myChart
// tagstotal
const tagsTotal = [
                "heart",
                "stomach",
                //"skin",
                "blood plasma",
                "brain",
                "kidney",
                "liver",
                "lung",
                "pancreas",
                "spleen",
                "adrenal gland",
                "testis",
                "ovary",
                //"uterus",
                "prostate",
                "colon",
                "esophagus",
                "placenta",
]
protein.value = Array.isArray(router.currentRoute.value.query.protein) ? router.currentRoute.value.query.protein : [router.currentRoute.value.query.protein]
routerName.value = router.currentRoute.value.name
// get proteins
const getProteinTable = async () => {
  emit('changeLoading')
  const res = routerName.value ==='tissues' ? await getProteins() : await getCellLineProteins()
  const byteArray = new Uint8Array(res.data)
  const data = inflate(byteArray, { to: 'string' })
  proteinTable = JSON.parse(data)
  emit('changeLoading')
  queryProtein(protein)
}
// delete tag
const handleClose = (tag) => {
  dataHistory.value.splice(proteinTags.value.indexOf(tag), 1)
  proteinTags.value.splice(proteinTags.value.indexOf(tag), 1)
  routerName.value ==='tissues' ? router.push({ path: "/baseline/tissues", query: { protein: tags.value } }) : router.push({ path: "/baseline/cellline", query: { protein: tags.value} })
}
// qeury
const queryProtein = (input) => {
  if (typeof(input.value[0]) === "undefined") {
    // init()
    showImg.value = false
    myChart ? myChart.dispose() : myChart
    return
  }
  let proteins = proteinTable
  input.value.map((protein) => {
    const output = proteins.find((item) => {
      return item.name === protein.trim() || item.gene_name === protein.trim()
    })
    if (!output) {
      alert('Please enter a legal protein name')
      return
    }
    let tag = `${output.name}(${output.gene_name})`
    if (!proteinTags.value.includes(tag.trim())) {
      if (proteinTags.value.length === 5) {
        proteinTags.value.shift()
        proteinTags.value.push(tag)
        dataHistory.value.shift()
        dataHistory.value.push(output)
      } else {
        proteinTags.value.push(tag)
        dataHistory.value.push(output)
      }
    }
  })
  if (proteinTags.value.length != input.value.length) {
    routerName.value ==='tissues' ? router.push({ path: "/baseline/tissues", query: { protein: tags.value } }) : router.push({ path: "/baseline/cellline", query: { protein: tags.value } })
    //router.push({ path: "/ae/tissues", query: { protein: proteinTags.value } })
  } else {
    showImg.value = true
    imgH = dataHistory.value.length > 1 ? dataHistory.value.length * 400 : 500
    nextTick(() => {
      init()
    })
  }
}
// watch route
onBeforeRouteUpdate((to) => { 
  protein.value = to.query.protein
  queryProtein(protein)
})

// load update
onMounted(() => {
  getProteinTable()
})


// init data
const initData = (data) => {
  if (routerName.value === 'tissues') {
    if (data.tags.length < 18) {
    tagsTotal.map((item) => {
      if (!data.tags.includes(item)) {
        data.tags.push(item)
        data.data.push([])
      }
    })
  }
  }
  let dataSort = []
  for (let i = 0; i < data.tags.length; i++) {
    let obj = {}
    obj['name'] = data.tags[i]
    obj['data'] = data.data[i].filter(value=>value>=1)
    dataSort.push(obj)
  }
  if (routerName.value !== 'tissues') {
    dataSort.sort((obja, objb) => {
    const lena = obja.data.length
    const lenb = objb.data.length
    return lenb - lena
    })
    dataSort = dataSort.slice(0, 20);
  }
  // sort data
  dataSort.sort((obja,objb) => {
    /*  
    objb.data.sort((a, b) => { return a - b })
    const lena = obja.data.length
    const lenb = objb.data.length
    const mida = obja.data[Math.floor(lena / 2)]
    const midb = objb.data[Math.floor(lenb / 2)] 
    */
    const mida = obja.data.length > 0 ? obja.data.reduce((a, b) => a + b) / obja.data.length : 0
    const midb = obja.data.length > 0 ? objb.data.reduce((a, b) => a + b) / objb.data.length : 0
    return mida - midb
  })
  // get sort column
  let neatData = []
  let tags = []
  dataSort.map((item) => {
    neatData.push(item.data)
    tags.push(item.name)
  })
  return {
    neatData,
    tags
  }
}
// init image
const init = () => {
  if (dataHistory.value.length === 1) {
    options.dataset = []
    options.series = []
    options.title = []
    options.legend.show = false
    let { neatData, tags } = initData(dataHistory.value[0])
    sortTags.value = tags
    options.title.push({
      text: dataHistory.value[0].title,
      left: 'center'
    })
    let { samples,data } = countSingleValue(neatData,2)
    if (showBar.value) {
      options.series.push(
        {
          name: proteinTags.value[0],
          type: 'bar',
          data: data,
          itemStyle: {
              color: tagsColor[0],
              color0: '#FA0000',
              borderColor: '#030609',
              borderColor0: '#030609',
          },
          label: {
            show: showLabel.value,
            position: 'right',
            formatter: function () {
              return `samples: ${samples.shift()}`
            }
          }
        }
      )
      options.tooltip = {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      }
      options.yAxis.data = sortTags.value
    } else {
      options.dataset.push({
      source: neatData
      })
      options.dataset.push({
          fromDatasetIndex: 0,
          transform: {
            type: 'boxplot',
            config: {
              itemNameFormatter: function (params) {
                return tags[params.value]
              }
            }
          }
      })
      options.series.push({
          name: 'category0',
          type: 'boxplot',
          datasetIndex: 1,
          itemStyle: {
            color: tagsColor[0],
            color0: '#FA0000',
            borderColor: '#030609',
            borderColor0: '#030609',
          },
      })
      options.tooltip = getBoxTooltips(samples)
    }
  } else {
    if (routerName.value === 'tissues') {
      sortTags.value = sortTags.value.length ===0 ? initData(dataHistory.value[0]).tags : sortTags.value
    } else {
      sortTags.value = sortTags.value.length ===0 ? initData(dataHistory.value[0]).tags : sortTags.value
    }
    dataHistory.value.length === 0 ? options.title = [] : options.title.splice(0,1,{
      text: `Comparison of protein expression in different ${routerName.value}`,
      left: 'center'
    })
    dataHistory.value.length === 0 ? options.legend.show = false : options.legend.show = true
    let datas = []
    dataHistory.value.map((item) => {
      let data = []
      sortTags.value.forEach((tissue) => {
        if (!item.tags.includes(tissue)) {
          data.push([])
        } else {
          let index = item.tags.indexOf(tissue)
          let rowArr = item.data[index].filter(v=>v>=1)
          data.push(rowArr)
        }
      })
      datas.push(data)
    })
    let { samples,data } = countSingleValue(datas, 3)
    if (showBar.value) {
      datas = data
      options.dataset = []
      options.series = []
      options.legend.data = []
      datas.forEach((item, index) => {
        options.series.push(
        {
          name: proteinTags.value[index],
          type: 'bar',
          data: item,
          itemStyle: {
              color: tagsColor[index],
              color0: '#FA0000',
              borderColor: '#030609',
              borderColor0: '#030609',
            },
          label: {
            show: showLabel.value,
            position: 'right',
            formatter: function () {
              return `samples: ${samples[index].shift()}`
            }
          }
          })
        options.legend.data.push({
          name: proteinTags.value[index],
          itemStyle: {
            color: tagsColor[index],
            borderColor: tagsColor[index]
          }
        })
      })
      options.tooltip = {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      }
      options.yAxis.data = sortTags.value
    } else {
      options.dataset = []
      options.series = []
      options.legend.data = []
      datas.forEach((item,index) => {
        options.dataset.push({
          source: item
        })
        options.series.push({
          name: proteinTags.value[index],
          type: 'boxplot',
          datasetIndex: datas.length + index,
          itemStyle: {
            color: tagsColor[index],
            color0: '#FA0000',
            borderColor: '#030609',
            borderColor0: '#030609',
          },
        })
        options.legend.data.push({
          name: proteinTags.value[index],
          itemStyle: {
            color: tagsColor[index],
            borderColor: tagsColor[index]
          }
        })
      })
      datas.forEach((item, index) => {
        options.dataset.push({
          fromDatasetIndex: index,
          transform: {
            type: 'boxplot',
            config: {
              itemNameFormatter: function (params) {
                return sortTags.value[params.value]
              }
            }
          }
        })
      })
      options.tooltip = getBoxTooltips(samples)
    }
  }

  if (myChart != null && myChart !== '' && myChart !== undefined) {
    myChart.dispose() // discard
  }
  myChart = echarts.init(chart.value,'macarons')
  myChart.clear()
  myChart.resize({
    height: imgH
  })
  myChart.setOption(options)
  nextTick(() => {
    if (protein.value.length !== 0) {
      let imgDataUrl = myChart.getDataURL({
    type: 'svg',
    pixelRatio: 2,
    backgroundColor: '#fff',
    excludeComponents: ['toolbox']
    })
    let urlFile = {
      proteinName: protein.value,
      url: imgDataUrl
    }
    imgs.value.unshift(urlFile)
    }
  })
}
// count single value
const countSingleValue = (data, dimension) => {
  if (dimension === 2) {
    /*
    let singleNum = data.filter((arr) => arr.length == 1).length
    if (singleNum >= 10) {
      data = data.map((arr) => Number((arr.reduce((a, b)=>a+b)/arr.length).toFixed(2)))
    }
    return { singleNum, data } 
    */
    let samples = data.map((arr) => arr.length)
    data = data.map((arr) => arr.length > 0 ? Number((arr.reduce((a, b) => a + b) / arr.length).toFixed(2)) : 0)
    return { samples,data }
  } else {
    /*
    let singleNum = data[0].filter((arr) => arr.length == 1).length
    if (singleNum >= 10) {
      data = data.map((res) => res.map((arr) => arr.length > 0 ? Number((arr.reduce((a, b)=>a+b)/arr.length).toFixed(2)) : 0))
    }
    return { singleNum, data } 
    */
    let samples = data.map((res) => res.map((arr) => arr.length))
    data = data.map((res) => res.map((arr) => arr.length > 0 ? Number((arr.reduce((a, b) => a + b) / arr.length).toFixed(2)) : 0))
    return { samples,data }
  }
}

//
const changeShowBar = () => {
  init()
}
const changeShowLabel = () => {
  init()
}
</script>
<style scoped>
.content-box {
  width: 100%;
}
.info {
  text-align: left;
  margin: 20px 0;
  margin-left: 2px;
  display: flex;
  justify-content: space-between;
}
.info h1 {
  font-size: 14px;
  margin: 5px 0;
  font-weight: inherit;
  font-weight: 500;
}
.info span {
  font-weight: 700;
}
.history-info:hover {
  color: black;
  cursor: pointer;
}
</style>