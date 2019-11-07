import React, { Component } from 'react';
import { Button, message } from 'antd';
import {
  exportExcelByTable,
} from '../../../components/common/JSExcel';
import '../index.css';

export default class extends Component {
  exportSpecialExcel = () => {
    const _headers = ['id', 'name', 'age', 'country', 'remark'];
    const _data = [
      { id: '1', name: 'test1', age: '30', country: 'China', remark: 'hello' },
      {
        id: '2',
        name: 'test2',
        age: '20',
        country: 'America',
        remark: 'world'
      },
      { id: '3', name: 'test3', age: '18', country: 'Unkonw', remark: '???' }
    ];

    try {
      exportExcelByTable({
        header: _headers,
        data: _data,
      }, '一个普通的Excel.xlsx');
    } catch (e) {
      message.error(e.message);
    }
  };

  render() {
    return (
      <div style={{ padding: 24 }}>
        <Button style={{ marginTop: 16 }} onClick={this.exportSpecialExcel}>
          导出指定Excel
        </Button>
      </div>
    );
  }
}
