import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layout, Typography, Card, Row, Col } from "antd";
import 'antd/dist/reset.css';
import backgroundImage from "./assets/backgroundImage.jpg";
import {DotChartOutlined  } from "@ant-design/icons";
import { CloudOutlined }from "@ant-design/icons";
import { DashboardOutlined }from "@ant-design/icons";
import {BarChartOutlined }from "@ant-design/icons";
const { Title } = Typography;
const { Content } = Layout;

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=Boumerdes&appid=85edf77be2b587bbd30f355ad5344f8e&units=metric"
      )
      .then((response) => {
        setWeatherData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <Layout
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Content style={{ width: "100%", height: "10px", display: "flex", justifyContent: "center" }}>
        {loading ? (
          <Title level={3}>Loading Weather...</Title>
        ) : error ? (
          <Title level={3} style={{ color: "red" }}>
            Error loading weather data
          </Title>
        ) : weatherData ? (
          <Card
            style={{
              height: "50vh",
              width: "85vh",
              padding: "20px",
              marginTop: "180px",
              marginRight: "50px",
              borderRadius: "10px",
              borderColor: "transparent",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 1.1)",
              textAlign: "center",
            }}
          >
            <Title level={2} style={{ marginBottom: "10px", fontSize: "28px", color: "#1890ff" }}>
              {weatherData.name}, {weatherData.sys.country}
            </Title>
            <Row gutter={[80, 16]} style={{ marginBottom: "10px" }}>
              <Col span={24}>
                <div style={{ fontSize: "30px", marginBottom: "15px", fontWeight: "bold" }}>Temperature:</div>
                <div style={{ fontSize: "40px", color: "#1890ff", fontWeight: "bold" }}>
                  {weatherData.main.temp}°C
                </div>
              </Col>

              <Col span={12}>
                <div style={{ fontSize: "25px", marginBottom: "10px", fontWeight: "bold" }}>  Weather:    <CloudOutlined  style={{color:"#ffff", fontSize: "22px" }}/></div>
                <div style={{ fontSize: "30px", color: "#CAF0F8" }}>
                  {weatherData.weather[0].description}
                </div>
              </Col>
              <Col span={12}>
                <div style={{ fontSize: "25px", marginBottom: "10px", fontWeight: "bold" }}>  Wind Speed:     <DashboardOutlined  style={{color:"#ffff", fontSize: "22px" }}/></div>
                <div style={{ fontSize: "30px", color: "#CAF0F8" }}>
                  {weatherData.wind.speed} m/s
                </div>
              </Col>

              <Col span={12}>
                <div style={{ fontSize: "25px", marginBottom: "10px", fontWeight: "bold" }}>  Humidity:      <DotChartOutlined  style={{color:"#ffff", fontSize: "22px" }} /></div>
                <div style={{ fontSize: "30px", color: "#CAF0F8" }}>
                  {weatherData.main.humidity}%
                </div>
              </Col>
              <Col span={12}>
                <div style={{ fontSize: "25px", marginBottom: "10px", fontWeight: "bold" }}> Pressure:        <BarChartOutlined  style={{color:"#ffff", fontSize: "22px" }}  /></div>
                <div style={{ fontSize: "30px", color: "#CAF0F8" }}>
                  {weatherData.main.pressure} hPa
                </div>
              </Col>
            </Row>
          </Card>   
        ) : (
          <Title level={3}>No weather data available</Title>
        )}
      </Content>
    </Layout>
  );
}

export default App;
