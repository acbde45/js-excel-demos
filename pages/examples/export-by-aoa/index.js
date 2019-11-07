import React, { Component } from 'react';
import { Button, message } from 'antd';
import {
  exportExcelByAOA,
} from '../../../components/common/JSExcel';
import '../index.css';

export default class extends Component {

  exportAOA2Excel = () => {
    const aoa = [
      [ 'S', 'h', 'e', 'e', 't', 'J', 'S' ],
      [  1 ,  2 ,  3 ,  4 ,  5 ]
    ];

    try {
      exportExcelByAOA(aoa, 'aoa.xlsx');
    } catch (e) {
      message.error(e.message);
    }
  }

  render() {
    return (
      <div style={{ padding: 24 }}>
        <Button style={{ marginTop: 16 }} onClick={this.exportAOA2Excel}>
          导出Excel通过aoa的形式
        </Button>
      </div>
    );
  }
}
