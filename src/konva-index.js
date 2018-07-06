const Konva = require('konva')

const getStage = (containerId, width, height) => new Konva.Stage({
    container: containerId,
    width,
    height
})

const getBaseParam = () => ({
    x: 150,
    y: 70,
    width: 100,
    height: 100,
    fill: 'black',
    stroke: 'red',
    draggable: true
})

const getCircle = param => new Konva.Circle(param)

const getLayer = () => new Konva.Layer()

const circleGenerator = (width, height) => {
    const nodeTotal = 800
    const layerNodeLimit = 40

    const baseParam = getBaseParam()
    const groups = []
    let circles = []

    for (let i = 0; i < nodeTotal; i++) {
      const eleX = Math.round(width * Math.random())
      const eleY = Math.round(height * Math.random())
      const param = Object.assign({}, baseParam, {x: eleX, y: eleY})
      circles.push(getCircle(param))
      if (circles.length === layerNodeLimit) {
        groups.push(circles);
        circles = [];
      }
    }
    return groups
}

const  distributionLayer = (groups, width, height) => {

    const stage = getStage('root', width, height)
    
    const layers = groups.map(g => {
        const layer = getLayer()
        layer.add(...g)
        return layer
    })

    stage.add(...layers)
}

const  distributionStage = (groups, width, height) => {
    const root = document.querySelector('#root')
    groups.map(g => {
        const div = document.createElement('div')
        div.style.position = 'absolute'
        root.appendChild(div)
        const stage = getStage(div, width, height)
        const layer = getLayer()
        layer.add(...g)
        stage.add(layer)
    })
}

const main = () => {
    const width = window.innerWidth
    const height = window.innerHeight

    const groups = circleGenerator(width, height)

    distributionLayer(groups, width, height)
    // distributionStage(groups, width, height)
}
    
main()
    