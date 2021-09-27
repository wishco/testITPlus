let uniqId_dataGrid: number // последний заданный id при переборе, для dataGrid

export const iteratorHeatData: any = function (this: any) {
    const CONSUMPTIONS: string = "consumptions"
    const ID_DATA_GRID: string = "id"
    let consumerIndex: number = 0
    let consumptionIndex: number = 0
    let done: boolean = false
    let obj: any = this


    return {
        next: function () {
            const _CONSUMERS_LENGTH: number = Object.entries(obj).length
            const _CONSUMPTIONS_LENGTH: number = obj[consumerIndex][CONSUMPTIONS].length
            let _resultArray: any[] = []

            if (!done) {
                if (consumptionIndex >= _CONSUMPTIONS_LENGTH) {
                    consumptionIndex = 0
                    consumerIndex += 1
                }
            }

            if (consumerIndex >= _CONSUMERS_LENGTH) done = true  // если переполнение вернего индекса, то закончим перебор

            if (!done) { // формирование нового объекта, при переборее
                _resultArray.push({[ID_DATA_GRID]: ++uniqId_dataGrid}) // необходимо созать посля id, для DataGrid
                Object.entries(obj[consumerIndex]).forEach((el: any) => {
                    const elKey = el[0]
                    const elValue = el[1]

                    switch (elKey) {
                        case CONSUMPTIONS:
                            _resultArray.push(elValue[consumptionIndex])
                            break
                        default:
                            _resultArray.push({[elKey]: obj[consumerIndex][elKey]})
                            break
                    }
                })
                consumptionIndex++ // увеличиваем самый низкий индекс вложенности
            }

            return (!done) ?
                {value: Object.assign({}, ..._resultArray), done: false}  // value -> получаем новый объект из массива объектов
                :
                {value: undefined, done: true}
        }
    }
}

export function getRowsHeatData(heatData: any): any {
    uniqId_dataGrid = 0; // при вызове, сбросить значение

    function getNewConsumer(consumersSection: any) {
        let newConsumersSection = JSON.parse(JSON.stringify(consumersSection))
        newConsumersSection[Symbol.iterator] = iteratorHeatData.bind(newConsumersSection)
        let arrayConsumers = []
        for (let el of newConsumersSection) {
            arrayConsumers.push(el)
        }
        return arrayConsumers
    }

    let switchFlag: string = ""
    if (heatData.constructor === Array) switchFlag = "Array"

    let result = null
    switch (switchFlag) {
        case "Array":
            result = getNewConsumer(heatData)
            break

        default:
            let arrConsumers = (Object.keys(heatData)).map(item => {
                return getNewConsumer(heatData[item])
            })

            result = arrConsumers.reduce((acc, curr) => {
                return acc.concat(curr)
            }, [])
            break
    }

    return result

}
