import './Single.css';
import React from 'react';
import { useState} from 'react';
import { Box, Button, Grommet, Paragraph, Grid } from 'grommet';
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
const projection = [
  'world12d_48',
'extyaleb_30',
'covertype_26',
'hepatitis_31',
'ecoli_21',
'olive_26',
'glassidentification_53',
'ecoli_18',
'extyaleb_37',
'covertype_21',
'ecoli_27',
'mnist64_17',
'mnist64_58',
'echocardiogram_3',
'breastcancercoimbra_28',
'breastcancerwisconsinprognostic_65'
]


// ['heartdisease_5',
// 'breastcancercoimbra_16',
// 'olive_50',
// 'breastcancercoimbra_17',
// 'wine_14',
// 'breastcancerwisconsinprognostic_42',
// 'weather_32',
// 'iris_2',
// 'olive_2',
// 'weather_4',
// 'breastcancerwisconsinprognostic_8',
// 'boston_41',
// 'iris_40',
// 'extyaleb_66',
// 'wine_4',
// 'boston_56',
// 'olive_58',
// 'wine_1',
// 'heartdisease_67',
// 'breastcancerwisconsinprognostic_63',
// 'ecoli_66',
// 'extyaleb_48',
// 'extyaleb_61',
// 'heartdisease_64',
// 'mnist64_41',
// 'breastcancercoimbra_9',
// 'housing_36',
// 'housing_20',
// 'iris_35',
// 'covertype_15',
// 'housing_18',
// 'world12d_4',
// 'breastcancerwisconsinprognostic_29',
// 'wine_41',
// ]

const projections = [
  'world12d_48',
'extyaleb_30',
'covertype_26',
'hepatitis_31',
'ecoli_21',
'olive_26',
'glassidentification_53',
'ecoli_18',
'extyaleb_37',
'covertype_21',
'ecoli_27',
'mnist64_17',
'mnist64_58',
'echocardiogram_3',
'breastcancercoimbra_28',
'breastcancerwisconsinprognostic_65',


'breastcancercoimbra_16_nolabel',
'extyaleb_48_nolabel',
'olive_50_nolabel',
'breastcancercoimbra_17_nolabel',
'boston_56_nolabel',
'wine_14_nolabel',
'breastcancerwisconsinprognostic_42_nolabel',
'weather_32_nolabel',
'weather_4_nolabel',
'boston_41_nolabel',
'iris_40_nolabel',
'extyaleb_66_nolabel',

'wine_41_nolabel',
'wine_41_label',
'iris_2_nolabel',
'iris_2_label',
'olive_2_nolabel',
'olive_2_label',
'wine_4_nolabel',
'wine_4_label',
'heartdisease_67_nolabel',
'heartdisease_67_label',
'breastcancerwisconsinprognostic_8_nolabel',
'breastcancerwisconsinprognostic_8_label',
'breastcancerwisconsinprognostic_65_nolabel',
'breastcancerwisconsinprognostic_65_label',
'breastcancerwisconsinprognostic_63_nolabel',
'breastcancerwisconsinprognostic_63_label',
'breastcancercoimbra_9_nolabel',
'breastcancercoimbra_9_label',
'breastcancerwisconsinprognostic_29_nolabel',
'breastcancerwisconsinprognostic_29_label',
'housing_36_nolabel',
'housing_20_label',
'iris_35_nolabel',
'iris_35_label',

'extyaleb_48_label',
'weather_4_label',
'boston_41_label',
'iris_40_label',
'extyaleb_66_label',
'boston_56_label',
'breastcancerwisconsinprognostic_42_label',


  
  'weather_32_label',
'weather_4_label',
'olive_50_label',
'breastcancercoimbra_17_label',
'wine_14_label',
'breastcancercoimbra_16_label',

'heartdisease_64_nolabel',
 'olive_58_nolabel',
 'mnist64_41_nolabel',
 'covertype_15_nolabel',
 'ecoli_66_nolabel',
 'world12d_4_nolabel',
 'wine_1_nolabel',
 'extyaleb_61_nolabel',
 'heartdisease_5_nolabel',
 'housing_18_nolabel',

 'heartdisease_64_label',
 'heartdisease_5_label',
 'wine_1_label',
 'mnist64_41_label',
 'extyaleb_61_label',
 'covertype_15_label',
 'world12d_4_label',
 'ecoli_66_label',
 'breastcancerwisconsinprognostic_65_label',
 'olive_26_label',
 
 
 
//  'olive_58_label',
// 'housing_20_nolabel',
//  'ecoli_18_nolabel',
//  'ecoli_18_label',
//  'extyaleb_30_nolabel',
//  'extyaleb_30_label',
//  'breastcancerwisconsinprognostic_65_nolabel',
 
 
//  'olive_2_nolabel',
//  'olive_2_label',
//  'boston_56_nolabel',
//  'boston_56_label',
//  'ecoli_21_nolabel',
//  'ecoli_21_label',
//  'iris_35_nolabel',
//  'iris_35_label',
//  'ecoli_27_nolabel',
//  'ecoli_27_label',
//  'olive_26_nolabel',
//  'mnist64_58_nolabel',
//  'mnist64_58_label',
//  'iris_2_nolabel',
//  'iris_2_label',
//  'breastcancercoimbra_28_nolabel',
//  'breastcancercoimbra_28_label'




]

function Single() {
  
  
  const [mdpNum, setMdpNum] = useState(0);
  const dataName = projections[mdpNum].split('_')[0]
  const projectionIdx = projections[mdpNum].split('_')[1]
  const isLabel = projections[mdpNum].split('_')[2] === "nolabel" ? false : true;
  // const isLabel = true;
  const label = require(`/public/data/label/${dataName}.json`);
  const ld = require(`/public/data/ld/${dataName}_${projectionIdx}.json`);
  const datasetInfo = info[dataName]
  console.log(dataName, isLabel)
  
  
  
  return (
    <Grommet>
      <Box alignContent='center'>
      <Grid
      alignSelf='center'
  rows={['600px', 'large']}
  columns={['600px', '400px']}
  gap="small"
  areas={[
    { name: 'nav', start: [0, 0], end: [0, 0] },
    { name: 'main', start: [1, 0], end: [1, 0] },
    { name: 'footer', start: [0, 1], end: [1, 1] },
  ]}
>
<Box gridArea='nav'>
      <SplotCanvas
				projectionIdx={projectionIdx}
				dataName={dataName}
				size={600}
				ld={ld}
				label={label}
        isLabel={isLabel}
				radius={12}
			/>
      </Box>
  <Box gridArea="main" background="light-2" style={{margin: "10px 0 0 0"}}>
    <p>
  당신은 아래 데이터를 차원 축소 기법을 이용하여 분석하려고 합니다. 데이터의 기본적인 정보는 아래와 같습니다.</p>
  {dataName}_{projectionIdx}
  <Paragraph margin='5px 0 0 5px'>
      {datasetInfo['dim']} dimension
      </Paragraph>
      <Paragraph margin='5px 0 0 5px'>
    {datasetInfo['row']} row (data point)
    </Paragraph>
    {isLabel && 
    <Paragraph margin='5px 0 20px 5px'>
    {datasetInfo['class']} class (label)
  </Paragraph>
    }
      
  <Paragraph margin='5px 0 0 5px'>
  결과물이 왼쪽과 같을때, 결과물을 신뢰하고 사용할 수 있습니까? 
  </Paragraph>
  </Box>
  <Box gridArea='footer'  style={{display:"inline-block"}}>
    {
      Array.from(Array(projections.length)).map((_, i) => {
        return(<Button size='medium' margin='xsmall' id={`btn_${i}`}primary={mdpNum === i ? true : false} label={i.toString()}
          onClick={() => {
          setMdpNum(i)}}
          ></Button>)
      })  
    }
    </Box>
</Grid>
</Box>
    </Grommet>
  );
}

export default Single;
