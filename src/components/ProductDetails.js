import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import products from "../images/products.png";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import "../stylesheets/productDetails.css";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3002/productDetails")
      .then((response) => {
        console.log("details from axio", response.data);
        dispatch({
          type: "UPDATE_PROD_DETAILS",
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);
  const { allProductsDetails = [], selectedProducts = [] } = useSelector(
    (state) => state.prodDetails
  );
  console.log("allProductsDetails1", allProductsDetails);
  const { products = {} } = allProductsDetails;
  const { data = {} } = products;
  const { items = [] } = data;

  const onPlusClick = (eachProductDetails) => {
    const { id = "" } = eachProductDetails;
    const temp = [...selectedProducts];
    const filterData = temp.filter(({ id: selectedId = "" }) => {
      return id == selectedId;
    });
    if (filterData.length == 0) {
      temp.push({
        id,
        count: 1,
      });

      dispatch({
        type: "UPDATE_SELECTED_PROD_DETAILS",
        payload: temp,
      });
    } else {
      let { count: selectedCount = "" } = filterData?.[0] || {};
      const updatedArray = selectedProducts.map((obj) => {
        if (obj.id === id) {
          return { ...obj, count: selectedCount + 1 }; // Update the name of the object with id 2
        }
        return obj;
      });
      dispatch({
        type: "UPDATE_SELECTED_PROD_DETAILS",
        payload: updatedArray,
      });
    }
  };

  const onMinusClick = ({ id = "" }) => {
    if (getProdCount(id) > 0) {
      const updatedArray = selectedProducts.map(
        ({ id: selectedId = "", count = "" }) => {
          if (selectedId == id) {
            return { id, count: count - 1 };
          } else return { id: selectedId, count };
        }
      );
      console.log("updatedArray", updatedArray);
      dispatch({
        type: "UPDATE_SELECTED_PROD_DETAILS",
        payload: updatedArray,
      });
    }
  };

  const getAllItemsCount = () => {
    let temp = 0;
    selectedProducts.map(({ count = 0 }) => {
      temp += count;
      return;
    })?.[0];
    console.log("totalCount", temp, selectedProducts);
    return temp;
  };

  const getProdCount = (selectedId) => {
    console.count("test");
    const { count } =
      selectedProducts.filter(({ id = "" }) => {
        return selectedId == id;
      })?.[0] || {};
    if (count);
    return count || 0;
  };

  const onCartClick = () => {
    navigate("/Products/Cart");
  };

  return (
    <div>
      <Container>
        <div className="cartButtons">
          <Button onClick={onCartClick}>
            Add to Cart({getAllItemsCount()})
          </Button>
          <h3>Products Details</h3>
        </div>
        <Row xs={1} md={3} className="g-4">
          {items.map((eachProduct, idx) => {
            const {
              id = "",
              name = "",
              description = "",
              features = "",
              price = "",
              keywords = "",
              url = "",
              category = "",
              subcategory = "",
            } = eachProduct;
            return (
              <Col key={idx}>
                <Card>
                  <Card.Img variant="top" src={products} alt="image" />
                  <Card.Body>
                    <Card.Title style={{ color: "brown" }}>
                      {name}-{idx + 1}
                    </Card.Title>
                    <Card.Text className="cardTextStyle">
                      {description}
                    </Card.Text>
                    <Card.Text className="cardTextStyle">
                      Price: <span>{price}</span>
                    </Card.Text>
                    <Card.Text className="cardTextStyle">ID: {id}</Card.Text>
                    <div className="symbolsStyle">
                      <Button
                        onClick={() => {
                          onMinusClick(eachProduct);
                        }}
                      >
                        -
                      </Button>
                      <p>{getProdCount(eachProduct.id)}</p>
                      <Button
                        onClick={() => {
                          onPlusClick(eachProduct);
                        }}
                      >
                        +
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default ProductDetails;
