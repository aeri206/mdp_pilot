// @ts-nocheck
import { React, useState} from 'react';
import { Grommet, Select, DataTable, Box, Image, Page, PageContent, Button, Paragraph, Grid } from 'grommet';
import './Penta.css';
import * as d3 from 'd3';

import SplotCanvas from './components/SplotCanvas';


const info = {
    "boston":{"row":155,"class":3,"dim":13.0},
    "breastcancercoimbra":{"row":116,"class":2,"dim":9.0},
    "breastcancerwisconsinprognostic":{"row":569,"class":2,"dim":30.0},
    "covertype":{"row":581012,"class":7,"dim":54.0},
    "echocardiogram":{"row":61,"class":2,"dim":10.0},
    "ecoli":{"row":336,"class":8,"dim":7.0},
    "extyaleb":{"row":320,"class":5,"dim":30.0},
    "glassidentification":{"row":214,"class":6,"dim":9.0},
    "heartdisease":{"row":297,"class":5,"dim":13.0},
    "hepatitis":{"row":80,"class":2,"dim":19.0},
    "housing":{"row":688,"class":1,"dim":null},
    "iris":{"row":150,"class":3,"dim":4.0},
    "mnist64":{"row":1083,"class":6,"dim":64.0},
    "olive":{"row":572,"class":3,"dim":8.0},
    "weather":{"row":366,"class":7,"dim":192.0},
    "wine":{"row":178,"class":3,"dim":13.0},
    "world12d":{"row":151,"class":5,"dim":12.0}
  }

const dataNames = [
    'boston',
    'breastcancercoimbra',
    'breastcancerwisconsinprognostic',
    'covertype',
    'echocardiogram',
    'ecoli',
    'extyaleb',
    'glassidentification',
    'heartdisease',
    'hepatitis',
    'housing',
    'iris',
    'mnist64',
    'olive',
    'weather',
    'wine',
    'world12d'
]

const selected = 
{
    'boston': ['15', '21', '35', '51', '65'],
    'breastcancercoimbra': ['18', '30', '35', '48', '58'],
    'breastcancerwisconsinprognostic': ['24', '25', '4', '54', '68'],
    'covertype': ['12', '27', '3', '45', '60'],
    'dermatology': ['58', '6', '62', '66', '7'],
    'drybean': ['11', '14', '32', '44', '61'],
    'echocardiogram': ['23', '38', '50', '55', '7'],
    'ecoli': ['18', '22', '38', '45', '58'],
    'extyaleb': ['1', '17', '4', '48', '68'],
    'glassidentification': ['12', '47', '48', '54', '61'],
    'heartdisease': ['0', '3', '53', '55', '66'],
    'hepatitis': ['17', '20', '44', '47', '60'],
    'housing': ['12', '22', '4', '42', '61'],
    'iris': ['26', '37', '52', '55', '67'],
    'mnist64': ['0', '44', '49', '53', '9'],
    'olive': ['13', '19', '21', '55', '66'],
    'weather': ['12', '19', '39', '45', '54'],
    'wine': ['11', '29', '39', '62', '9'],
    'world12d': ['2', '45', '49', '58', '66']
}
  

function Penta(){
    const [dataName, setDataName] = useState(dataNames[0]);

    const [showMetric, setShowMetric] = useState(false);
    
    const x = 'metric'
    const metricData = require(`/public/data/${x}_some.json`);

    const label = require(`/public/data/label/${dataName}.json`);
    

    const columns = [
        {
            property: "number",
            header: "num",
            size: "xsmall",
            sortable: true,
            primary: true,

        },
        {
            property: "projection",
            header: "projection",
            size: "200px",
            resizable: true,
            sortable: false,
        },
        {
            property: "Trustworthiness",
            header: "Trustworthiness",
            sortable: true,
            size: "xsmall",
        },
        // {
        //     property: "Continuity",
        //     header: "Continuity",
        //     sortable: true,
        //     size: "xsmall",  
        // },
        // {
        //     property: "Steadiness",
        //     header: "Steadiness",
        //     sortable: true,
        //     size: "xsmall",  
        // },
        {
            property: "Cohesiveness",
            header: "Cohesiveness",
            sortable: true,
            size: "xsmall",
            
        },
        // {
        //     property: "RMSE",
        //     header: "RMSE",
        //     sortable: true,
        //     size: "xsmall",
            
        // },
        {
            property: "DTM_KL01",
            header: "DTM_KL01",
            sortable: true,
            size: "xsmall",
            // resizable: true,  
            
        },
        // {
        //     property: "Sammon",
        //     header: "Sammon",
        //     sortable: true,
        //     size: "xsmall",
            
        // },
        // {
        //     property: "Spearman",
        //     header: "Spearman",
        //     sortable: true,
        //     size: "xsmall",
            
        // }
    ]

    const theme = {
        global: {
            // font: {
            //     size: "13px"
            // }
        },
        dataTable: {
            alignSelf: 'center', 
            tableLayout: 'auto',
            body: {
                extend: `font-size: 15px`,
                border: 'horizontal',
                pin:'header',
            },
            header: {
                pad: "3px 0 3px 3px",
                // gap: "small",
                units: {
                    color: "text-xweak",
                    margin: 0
                  },
                  font: {
                      size: "12px",
                      weight: 900
                  }

            }

        }
    }
    const metrics = [
        "DTM_KL01",
        "Trustworthiness",
        "Cohesiveness"
    ];

    const colorScale = {
        'Trustworthiness':d3.interpolateGreens,
        'Cohesiveness':d3.interpolateBlues,
        'DTM_KL01':d3.interpolateReds,
    }

    const range = {};
    metrics.forEach(k => {
        range[k] = [];
    });

    selected[dataName].forEach(((projectionIdx) => {
        const key = dataName + "_" + projectionIdx;
        let metricValue = metricData[key];
        metrics.forEach(key => {
            range[key].push(metricValue[key]);
        });
    }));

    Object.entries(range).forEach(([k, vals]) => {
        range[k] = [Math.min(...vals), Math.max(...vals)];
    });
    
    const datasetInfo = info[dataName]

    return(
        <Grommet theme={theme}>
        <Box alignContent='center'>
            <Box style={{"display": "inline-block"}}>
        <Select
        style={{"display": "inline-block"}}
            options={dataNames}
            value={dataName}
            onChange={({ option }) => setDataName(option)}
          />  
          <Button
            as='div'
            size='large'
            fill='vertical'
            primary
            style={{"display": "inline-block"}} 
            onClick={() => {setShowMetric(!showMetric)}}
            label={showMetric ? 'Metric 숨기기' : 'Metric 보기'}></Button>
          </Box>
        <Grid
      alignSelf='center'
  columns={[['large', 'large'], ['small', 'medium']]}
  rows={['100%']}
  gap="small"
  areas={[
    { name: 'main', start: [0, 0], end: [0, 0] },
    { name: 'info', start: [1, 0], end: [1, 0] },
  ]}
>
<Box 
height={{ min: "small", max: "large" }}
gridArea="info" background="light-2" style={{margin: "10px 0 0 0"}}>
    <p>
  당신은 데이터를 차원 축소 기법을 이용하여 분석하려고 합니다.
  고차원 데이터를 분석하고 projection을 해당 분석의 근거로서 사용하고자 합니다. 
  <Paragraph margin='5px 0 0 5px'>
  서로 다른 method와 hyperparameter를 사용하여 총 5개의 projection을 얻었습니다.
  <Paragraph>
    
  (1) 왼쪽 projection들을 가지고 어떤 분석이 가능할까요
  </Paragraph>
  <Paragraph>
  (2) 왼쪽 projection들 중 데이터 분석에 가장 유용한 순서대로 순위를 매기세요
  </Paragraph>

  </Paragraph>
  
  데이터의 기본적인 정보는 아래와 같습니다.</p>
  <Paragraph margin='5px 0 0 5px'>
      {datasetInfo['dim']} dimension
      </Paragraph>
      <Paragraph margin='5px 0 0 5px'>
    {datasetInfo['row']} row (data point)
    </Paragraph>
    
    <Paragraph margin='5px 0 20px 5px'>
    {datasetInfo['class']} class (label)
  </Paragraph>
      
  
  </Box>
  <DataTable gridArea='main'
  alignSelf='start'
  alignContent='start'
            fill="vertical"
            style={{margin:'auto'}}
            sortable
            columns={columns}
            onSort={(event) => {
                console.log(event)
            }}

            data={selected[dataName].map(((projectionIdx, num) => {
                const key = dataName + "_" + projectionIdx;
                const metricValue = metricData[key];
                let newMetricValue = {};

                if (showMetric) {
                    Object.entries(metricValue).forEach(([key, value]) => {
                        newMetricValue[key] = Math.round(value * 1000) / 1000;
                    });
                }
                else {
                    Object.keys(metricValue).forEach((key) => {
                        newMetricValue[key] = '';
                    });

                }
                


                return({
                        ...newMetricValue,
                        number: num,
                        projection: (
                                <Image
                                    width={'200px'}
                                    fit="contain"
                                    src={`${process.env.PUBLIC_URL}/penta-img/${dataName}_${projectionIdx}.jpeg`}
                                />
                        )
                        

                    })
            }))}
          />
          </Grid>
          </Box>
        </Grommet>
    )

}

export default Penta;