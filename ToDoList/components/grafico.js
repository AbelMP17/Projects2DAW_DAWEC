
import * as echarts from "echarts";

export default function crearGrafico(container, { tasks }){
    
    const completed = tasks.filter(task => task.isCompleted).length;
    const notCompleted = tasks.filter(task => task.isCompleted == false).length;

    const contenedor = container;

    //dimensiones del grafico
    const width = contenedor.clientWidth;
    const height = contenedor.clientHeight;

    const option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 20,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: completed, name: 'Tasks Completed' },
              { value: notCompleted, name: 'Tasks Not Completed' },
            ]
          }
        ]
      };

    let miGrafico = echarts.init(contenedor);
    miGrafico.resize({width,height});
    miGrafico.setOption(option);
    
    return miGrafico;
}