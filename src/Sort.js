// // @ts-nocheck
import React, {useState } from "react";

import { Grommet, Grid, Table, TableHeader, TableRow, TableBody, TableCell, Select, List, DataTable, Box, Image, Page, PageContent, Button, Paragraph } from 'grommet';


import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";




  
  

const dataNames = [
    'boston',
    'breastcancercoimbra',
    'breastcancerwisconsinprognostic',
    'ecoli',
    'extyaleb',
    'glassidentification',
    'heartdisease',
    'hepatitis',
    'iris',
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
  



const Sort = () => {
    
    const [dataName, setDataName] = useState(dataNames[0]);

    const datasetInfo = info[dataName]
    
    const x = 'metric'
    const metricData = require(`/public/data/${x}_all.json`);
    console.log(metricData)
    const [users, setUsers] = useState(selected[dataName]);

    const handleDragEnd = (e) => {
      if (!e.destination) return;
      let tempData = Array.from(users);
      let [source_data] = tempData.splice(e.source.index, 1);
      tempData.splice(e.destination.index, 0, source_data);
      setUsers(tempData);
    };

    
    const round = val => Math.round(val * 10000) / 10000;
    
  return (
    <Grommet>
        <Box style={{"display": "inline-block"}}>
        <Select
        style={{"display": "inline-block"}}
            options={dataNames}
            value={dataName}
            onChange={({ option }) => {
                setUsers(selected[option]);
                setDataName(option);
            }}
          />
          </Box>
          <Grid
      alignSelf='center'
  columns={[['large', 'auto'], ['auto', 'large']]}
  rows={['auto', 'flex']}
  gap="small"
  areas={[
    { name: 'main', start: [0, 0], end: [0, 1] },
    { name: 'instruction', start: [1, 0], end: [1, 0] },
    { name: 'metric-info', start: [1, 1], end: [1, 1] },
  ]}
>
  <Box gridArea="main">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Table className="table borderd">
          <TableHeader border="bottom">
            <TableRow>
              <TableCell/>
              <TableCell>Num</TableCell>
              <TableCell>Projection</TableCell>
              <TableCell>
                F1 score of <br/> 
                Trustworthiness & <br />
                Continuity
              </TableCell>
              <TableCell>
                F1 score of <br/> 
                Steadiness & <br />
                Cohesiveness
              </TableCell>
              <TableCell>
                KL divergence <br />
                σ = 0.01
              </TableCell>
            </TableRow>
          </TableHeader>
          <Droppable droppableId="droppable-1">
            {(provider) => (
              <TableBody
                className="text-capitalize"
                ref={provider.innerRef}
                {...provider.droppableProps}
              >
                {
                    users.map((num, index) => (
                        <Draggable
                    key={num}
                    draggableId={num}
                    index={index}
                  >
                    {(provider) => {
                      let t = parseFloat(metricData[`${dataName}_${num}`]['Trustworthiness']); 
                      let c = parseFloat(metricData[`${dataName}_${num}`]['Continuity']);
                      let precision = t
                      let recall = t / (t + 1 - c)
                      let f1 = 2 * precision * recall / (precision + recall)

                      let st = parseFloat(metricData[`${dataName}_${num}`]['Steadiness']); 
                      let ch = parseFloat(metricData[`${dataName}_${num}`]['Cohesiveness']);
                      let precision_st = st
                      let recall_st = st / (st + 1 - ch)
                      let f1_st = 2 * precision_st * recall_st / (precision_st + recall_st)
                      
                      return(
                      <TableRow {...provider.draggableProps} ref={provider.innerRef}>
                        <TableCell {...provider.dragHandleProps}>:::::</TableCell>
                        <TableCell border="bottom">{num}</TableCell>
                        <TableCell border="bottom">{<Image
                                    width={'200px'}
                                    fit="contain"
                                    src={`${process.env.PUBLIC_URL}/penta-img/${dataName}_${num}.jpeg`}
                                />}</TableCell>
                        <TableCell border="bottom">{round(f1)}</TableCell>
                        <TableCell border="bottom">{round(f1_st)}</TableCell>
                        <TableCell border="bottom">{round(metricData[`${dataName}_${num}`]['DTM_KL001'])}</TableCell>
                      </TableRow>
                    )
                    }}
                  </Draggable>


                    ))
                }
                {provider.placeholder}
              </TableBody>
            )}
          </Droppable>
        </Table>
      </DragDropContext>
    </Box>
    <Box gridArea="instruction" 
      height={{ min: "small", max: "large" }}
      background="light-2" style={{margin: "5px 0 10px 0", padding: "20px 0 10px 10px"}}>
  당신은 데이터를 차원 축소 기법을 이용하여 분석하려고 합니다.
  데이터의 기본적인 정보는 아래와 같습니다.

  <Paragraph margin='5px 0 0 5px'>
      {datasetInfo['dim']} 차원
      </Paragraph>
      <Paragraph margin='5px 0 0 5px'>
    {datasetInfo['row']} 개의 data point
    </Paragraph>
    
    <Paragraph margin='5px 0 20px 5px'>
    {datasetInfo['class']} class (label)
  </Paragraph>

  왼쪽에는 이 데이터에 대한 5개의 projection과 각각의 evaluation metric이 제시되어 있습니다. 
    
  <p/>
  데이터 분석에 projection 전체를 사용하거나, 유용한 결론을 도출할 수 있는 projection을 선택적으로 사용할 수 있습니다. 
  
  <p><b>이 projection을 보고 데이터 분석에 가장 유용할 것 같다고 판단되는 순서대로 각 열(Row)을 나열하세요.</b></p>
  가장 유용하다고 판단한 기준과 가장 유용하지 않다고 판단한 기준은 무엇입니까? 

  
  </Box>
  <Box gridArea="metric-info"
    background="light-2" 
  >
    <List
    border="horizontal"
  primaryKey="name"
  secondaryKey={(item) => <Paragraph>{item.description}</Paragraph>}
  data={[
    { name: 'Trustworthiness', description: '고차원에서의 local한 이웃구조가 저차원에서 잘 보존 (높을수록 좋다, 잘 보존한다)' },
    { name: 'Continuity', description: '저차원에서 local한 이웃구조가 고차원에서 잘 보존 (높을수록 좋다, 잘 보존한다)' },
    { name: 'Steadiness', description: '고차원과 저차원간의 inter-cluster reliability, 고차원의 cluster가 projection 얼마나 잘 보존하였는가 (높을수록 좋다, 잘 보존한다)' },
    { name: 'Cohesiveness', description: '고차원과 저차원간의 inter-cluster reliability, projection의 cluster가 고차원에서 얼마나 잘 보존하였는가 (높을수록 좋다, 잘 보존한다)' },
    { name: 'DTM_KL001', description: 'HD - LD사이의 분포의 차이, global structure를 얼마나 잘 보존하였는가 (낮을수록 좋다)' },
  ]}
/>
    
  </Box>

      
    </Grid>
    </Grommet>
  );
}

export default Sort;