import React from 'react'
// import {Link} from 'react-router-dom'
import { listNasabahFunction } from './saga';

class Home extends React.Component{
    state={
        rows:[],
        errorMessage:''
    }

    _isMounted = false;
    componentDidMount(){
        this._isMounted = true
        this.getNasabahDetail()
    }

    componentWillMount  (){
        this._isMounted = false
    }

    getNasabahDetail = async function () {
        const data = await listNasabahFunction()
      if(data){
          //split jadi 2 key dan value trus masukin value ke rows state buat gampang rendering
          let obj = Object.entries(data.data)
          this.setState({rows:obj[1]})
      }else{
          this.setState({errorMessage:"Data Kosong"})
      }

    }

    renderJsx =()=>{
        var jsx = this.state.rows.map((val,index)=>{
            return(
                <div key={index}>
                    {val.id}
                </div>
            )
        })
        return jsx
    }


    render(){
        return(
    
            <div> 
            
                {this.renderJsx()}

            </div>
        )
    }
}

export default Home