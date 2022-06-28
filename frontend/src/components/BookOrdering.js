import React, { useState, useEffect } from "react";
import "./IncomeAndExpense.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthService from "../services/auth.service";
import { useForm } from "react-hook-form";
import OrderIncreaseModal from "./OrderIncreaseModal";
import Table from "react-bootstrap/Table";
import Accordion from 'react-bootstrap/Accordion'


export default function BookOrdering() {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState([]);
  const [selectedMenuId, setSelectedMenuId] = useState([]);
  const [selectedRestaurantMenus, setSelectedRestaurantMenus] = useState([]);
  const [allDishes, setAllDishes] = useState([]);
  const [forceRender, setForceRender] = useState(false);
  const [displayOrderIncreaseModal, setDisplayOrderIncreaseModal] = useState(false);
  const [orderIncreaseId, setOrderIncreaseId] = useState();
  const currentUser = AuthService.getCurrentUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onSubmit", reValidateMode: "onSubmit" });

  // Popup message configuration
  toast.configure();
  const successMessage = (msg) => {
    toast.success(msg, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      theme: "colored",
      pauseOnHover: false,
      hideProgressBar: true,
    });
  };
  const errorMessage = (msg) => {
    toast.error(msg, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      theme: "colored",
      pauseOnHover: false,
      hideProgressBar: true,
    });
  };

  const orderDish = async (id) => {
    const response = await fetch(`http://localhost:8080/api/orders/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
    });

    if (response.status === 200) {
      successMessage("Užsakyta");
      reset();
    } else {
      errorMessage("Klaida!");
    }

    setForceRender(!forceRender);
    setDisplayOrderIncreaseModal(false);
  };
  
  const showOrderIncreaseModal = (id) => {
    setDisplayOrderIncreaseModal(true);
    setOrderIncreaseId(id);
  };

  const hideOrderIncreaseModal = () => {
    setDisplayOrderIncreaseModal(false);
  };


  const dishesSum = allDishes.reduce((n) => n + 1, 0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:8080/api/restaurants/menu/dishes`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.accessToken}`,
          },
        }
      );
      const data = await response.json();
      setAllDishes(data);
    };
    fetchData();
  }, [forceRender]);

  return (
    <>
      <div className="container-fluid budget__expense sticky-config">
        <div className="container">
          <div className="row">
            <div className="col">
              <h2>Rinkitės iš {dishesSum} patiekalų  </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="bottom ">
        <div className="container">
          <div >
            <Accordion defaultActiveKey="0" >
              <Accordion.Item eventKey="0" >
                <Accordion.Header >Pasirinkite sąrašą patiekalų iš norimo restorano ir meniu</Accordion.Header>
                <Accordion.Body >
                  <div className="add">
                    {/* <div className="row text-center add__container">
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="col-12 col-sm-6 col-md-6 col-lg-6 input-group my-3"
                      >

                        <select
                          {...register("restaurantId", {
                            required: true,
                          })}
                          className="form-control add__description"
                          type="text"
                          onChange={(e) =>  setSelectedRestaurantId(e.target.value) }
                        >
                          <option value={""}>--Pasirinkite restoraną--</option>
                          {allRestaurants.map((option) => (
                            <option value={option.id}>{option.name}</option>
                          ))}

                        </select>

                        <select
                          {...register("menuId", {
                            required: true,
                          })}
                          className="form-control add__description"
                          type="text"
                          onChange={(e) => setSelectedMenuId(e.target.value) }
                        >
                          <option value={""}>--Pasirinkite meniu--</option>
                          {selectedRestaurantMenus.map((option) => (
                            <option value={option.id}>{option.name}</option>
                          ))}
                        </select>

                      </form>
                    </div> */}
       
                  </div>
                </Accordion.Body>
              </Accordion.Item>

            </Accordion>
          </div>
        </div>

        {/* <div className="mt-5 list"> */}
        <div className="container" style={{ paddingRight: 0 }}>
          <div
            className="col-12 expense"
            style={{ paddingLeft: 0, paddingRight: 0 }}
          >
            <div className="expense__list">
              <Table hover>
                <thead>
                  <tr>
                  <th>Pavadinimas</th>
                    <th>Apibūdinimas</th>
                    <th>ISB</th>
                    <th>Puslapių skaičius</th>
                  </tr>
                </thead>
                <tbody>
                  {allDishes.map((dish) => {
                    return (

                      <tr key={dish.id}>
                        <td>{dish.name}&nbsp;</td>
                        <td>{dish.description}&nbsp;</td>
                        <td>{dish.isbn}&nbsp;</td>
                        <td>{dish.pages}&nbsp;</td>


                        <td

                          style={{
                            textAlign: "right",
                            paddingLeft: 0,
                            paddingRight: 0,
                          }}
                        >

                          <button
                            onClick={() => showOrderIncreaseModal(dish.id)}
                            className="btn"
                            type="button"
                            style={{ paddingTop: 0, paddingBottom: 10 }}
                          >
                            <FontAwesomeIcon
                              icon={faCirclePlus}
                              className="add__btn__expense"
                              style={{ width: "20px" }}
                            />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <OrderIncreaseModal
                  showModal={displayOrderIncreaseModal}
                  hideModal={hideOrderIncreaseModal}
                  confirmModal={orderDish}
                  id={orderIncreaseId}
                />
              </Table>
            </div>

          </div>


        </div>
      </div>
    </>
  );
}
