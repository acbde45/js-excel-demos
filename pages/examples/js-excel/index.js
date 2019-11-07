import React, { Component } from 'react';
import { Button, Icon, message, Table } from 'antd';
import {
  ACCEPTABLE_FILE_TYPE,
  CONVERTED_DATA_TYPE,
  readExcel,
  exportExcel,
} from '../../../components/common/JSExcel';
import '../index.css';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      workbook: null,
      fileName: null,
      currentSheetIndex: null,
      data: { header: [], data: [] },
    }
  }

  readWorkbookFromLocalFile = async event => {
    try {
      const { workbook, data, file, currentSheetIndex } = await readExcel(event, CONVERTED_DATA_TYPE.TABLE);
      this.setState({
        workbook,
        fileName: file.name,
        currentSheetIndex,
        data,
      })
      this.renderExcel();
    } catch(e) {
      message.error(e.message);
    }
  };

  renderExcel = () => {
    const { data, workbook, currentSheetIndex } = this.state;
    const { header, data: body } = data;
    console.log(header, body);
    const dataSource = [
      {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
      },
    ];
    
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
      },
    ];
    
    return <Table dataSource={dataSource} columns={columns} />;
  };

  exportExcel = () => {
    const { workbook, fileName } = this.state;
    exportExcel(workbook, fileName);
  }

  render() {
    const { workbook, fileName } = this.state;

    return ( 
      <div style={{ padding: 24 }}>
        <Button className="upload-wrap">
          <Icon type="upload" />
          <input
            className="file-uploader"
            type="file"
            accept={ACCEPTABLE_FILE_TYPE}
            onChange={this.readWorkbookFromLocalFile}
          />
          <span className="upload-text">上传文件</span>
        </Button>
        <p className="upload-tip">支持 .xlsx、.xls 格式的文件</p>
        <Button style={{ marginTop: 16, marginLeft: 16 }} onClick={this.testAppendAOAToWorkSheet}>
          导出
        </Button>
        <p>结果输出：</p>
        <div id="result">
          { this.renderExcel() }
        </div>
      </div>
    );
  }
}
