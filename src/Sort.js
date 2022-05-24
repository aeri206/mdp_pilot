// // @ts-nocheck
import React, {useState } from "react";

import { Grommet, Table, TableHeader, TableRow, TableBody, TableCell, Select, DataTable, Box, Image, Page, PageContent, Button, Paragraph, Grid } from 'grommet';


import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";




  
  

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
  


const Sort = () => {
    
    const [dataName, setDataName] = useState(dataNames[0]);
    
    const x = 'metric'
    const metricData = require(`/public/data/${x}_some.json`);
    
    const [users, setUsers] = useState(selected[dataName]);

    const handleDragEnd = (e) => {
      if (!e.destination) return;
      let tempData = Array.from(users);
      let [source_data] = tempData.splice(e.source.index, 1);
      tempData.splice(e.destination.index, 0, source_data);
      setUsers(tempData);
    };

    
    const round = val => Math.round(val * 1000) / 1000;
    
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
      <DragDropContext onDragEnd={handleDragEnd}>
        <Table className="table borderd">
          <TableHeader border="bottom">
            <TableRow>
              <TableCell/>
              <TableCell>Num</TableCell>
              <TableCell>Projection</TableCell>
              <TableCell>Trustworthiness</TableCell>
              <TableCell>Cohesiveness</TableCell>
              <TableCell>DTM_KL01</TableCell>
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
                    {(provider) => (
                      <TableRow {...provider.draggableProps} ref={provider.innerRef}>
                        <TableCell {...provider.dragHandleProps}>:::::</TableCell>
                        <TableCell border="bottom">{num}</TableCell>
                        <TableCell border="bottom">{<Image
                                    width={'200px'}
                                    fit="contain"
                                    src={`${process.env.PUBLIC_URL}/penta-img/${dataName}_${num}.jpeg`}
                                />}</TableCell>
                        <TableCell border="bottom">{round(metricData[`${dataName}_${num}`]['Trustworthiness'])}</TableCell>
                        <TableCell border="bottom">{round(metricData[`${dataName}_${num}`]['Cohesiveness'])}</TableCell>
                        <TableCell border="bottom">{round(metricData[`${dataName}_${num}`]['DTM_KL01'])}</TableCell>
                      </TableRow>
                    )}
                  </Draggable>


                    ))
                }
                {provider.placeholder}
              </TableBody>
            )}
          </Droppable>
        </Table>
      </DragDropContext>
    </Grommet>
  );
}

export default Sort;