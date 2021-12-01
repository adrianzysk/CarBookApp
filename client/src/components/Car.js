import React, { useState } from "react";
import {Container, Button} from '@material-ui/core'
import './Car.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useMutation } from "@apollo/react-hooks";
import { gql } from '@apollo/client'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
      }
    },
  }));

const Car = ({idVehiclE,branD,modeL,productionDatE,examinationDatE,insuranceDatE}) => {
    const classes = useStyles();
    const [idVehicle, setIdVehicle] = useState(idVehiclE)
    const [brand, setBrand] = useState(branD)
    const [model, setModel] = useState(modeL)
    const [productionDate, setProductionDate] = useState(productionDatE)
    const [examinationDate, setExaminationDate] = useState(examinationDatE)
    const [insuranceDate, setInsuranceDate] = useState(insuranceDatE)

    const [editVehicle, { datas }] = useMutation(gql`
    mutation editVehicle($idVehicle: ID!, $brand: String!, $model: String!, $productionDate: String!, $examinationDate: String!, $insuranceDate: String!) {
        editVehicle(idVehicle: $idVehicle, brand: $brand, model: $model, productionDate: $productionDate, examinationDate: $examinationDate, insuranceDate: $insuranceDate) 
    }
  `);

  const [ deleteVehicle, { datass }] = useMutation(gql`
  mutation deleteVehicle($idVehicle: ID! ) {
      deleteVehicle(idVehicle: $idVehicle) 
  }
`);
    
   async function submitVehicles(e) {
    e.preventDefault();
    const { datas } = await editVehicle({ variables: {idVehicle,brand,model,productionDate,examinationDate,insuranceDate}});
    return  
    }

    async function deleteVehicles(e) {
      e.preventDefault();
      const { datas } = await deleteVehicle({ variables: {idVehicle}});
      return  
      }

    return(
        <Container className="container" maxWidth="md" >
          <div>CAR:</div>
          <form className={classes.root} autoComplete="off">
            <TextField id="outlined-required" label="Brand" defaultValue={branD} variant="outlined" onChange={event => setBrand(event.target.value)} required/>
            <TextField id="outlined-required" label="Model" defaultValue={modeL} variant="outlined" onChange={event => setModel(event.target.value)} required/>
            <TextField id="date" label="Producion Date" type="date" defaultValue={productionDatE} className={classes.textField} InputLabelProps={{shrink: true,}} onChange={event => setProductionDate(event.target.value)}/>
            <TextField id="date" label="Examination Date" type="date" defaultValue={examinationDatE} className={classes.textField} InputLabelProps={{shrink: true,}} onChange={event => setExaminationDate(event.target.value)}/>
            <TextField id="date" label="Insurance Date" type="date" defaultValue={insuranceDatE} className={classes.textField} InputLabelProps={{shrink: true,}} onChange={event => setInsuranceDate(event.target.value)}/>
          </form>
          <div className="paddings">
             <form onSubmit={submitVehicles}>
               <Button variant="outlined" size="large" type="submit">Update Info</Button>
             </form>
             <form className="marginsLeft" onSubmit={deleteVehicles}>
               <Button variant="outlined" size="large" type="submit">Delete Car</Button>
             </form>
             <form className="marginsLeft">
               <Button variant="outlined" size="large" type="submit">Repairs</Button>
             </form>
          </div>
        </Container>
    )
}

export default Car