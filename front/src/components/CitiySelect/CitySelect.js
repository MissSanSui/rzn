import React from 'react';
import { Cascader } from 'antd';
import {cityData} from './city'

class CitySelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shops: [],
            value: "",
        }
    }
 onChange=(value)=>{
  this.props.onChange(value)
}
render() {
      const options =  cityData;
          return (
        <Cascader options={options} onChange={this.onChange}  value={this.props.value} placeholder={this.props.placeholder} style={{width:"100%"}}  />
    );
}
}
export default CitySelect
