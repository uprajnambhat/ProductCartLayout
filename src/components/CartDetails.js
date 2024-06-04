import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import "../stylesheets/cartdetails.css";

const CartDetails = () => {
  const dispatch = useDispatch();
  const { allProductsDetails = [], selectedProducts = [] } = useSelector(
    (state) => state.prodDetails
  );
  console.log("selectedProducts2", selectedProducts);
  console.log("allProductsDetails2", allProductsDetails);
  const { products = {} } = allProductsDetails;
  const { data = {} } = products;
  const { items = [] } = data;

  const dataToDisplay = selectedProducts.map((eachProd) => {
    const { id: selectedId = "" } = eachProd;
    const filterData =
      items.filter(({ id = "", name = "", price = "" }) => {
        return selectedId == id;
      })?.[0] || {};
    return filterData;
  });

  const getCount = (eachId) => {
    const { id, count } =
      selectedProducts.filter(
        ({ id: selectedId = "", count: selectedCount = "" }) => {
          return eachId == selectedId;
        }
      )?.[0] || {};
    return count;
  };

  const onPlusClick = (eachId) => {
    const updatedData = selectedProducts.map((eachProd) => {
      const { id = "", count = "" } = eachProd;
      if (eachId == id) {
        eachProd.count += 1;
      }
      return eachProd;
    });
    dispatch({
      type: "UPDATE_SELECTED_PROD_DETAILS",
      payload: updatedData,
    });
  };

  const onMinusClick = (eachId) => {
    const updatedData = selectedProducts
      .map((eachProd) => {
        const { id = "", count = "" } = eachProd;
        if (eachId == id) {
          eachProd.count -= 1;
          if (eachProd.count == 0) return;
        }
        return eachProd;
      })
      .filter((item) => {
        return !!item;
      });
    dispatch({
      type: "UPDATE_SELECTED_PROD_DETAILS",
      payload: updatedData,
    });
  };

  const totalPrice = () => {
    let result = 0;
    selectedProducts.map((eachProd) => {
      const { id: selectedId = "", count = "" } = eachProd;
      const { price = "" } =
        items.filter(({ id = "" }) => {
          return id == selectedId;
        })?.[0] || {};
      result += count * price;
      return;
    });
    return result;
  };

  return (
    <div>
      <Container>
        <h5>Cart Details</h5>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {dataToDisplay.map((eachData, index) => {
              const { id = "", name = "", price = "" } = eachData;
              return (
                <tr key={`eachData ${index}`}>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{price}</td>
                  <td className="quantityStyle">
                    <p
                      onClick={() => {
                        onMinusClick(eachData.id);
                      }}
                    >
                      -
                    </p>
                    <p>{getCount(eachData.id)}</p>
                    <p
                      onClick={() => {
                        onPlusClick(eachData.id);
                      }}
                    >
                      +
                    </p>
                  </td>
                </tr>
              );
            })}
            <tr>
              <td></td>
              <td>To Pay</td>
              <td></td>
              <td>{totalPrice()}</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default CartDetails;
