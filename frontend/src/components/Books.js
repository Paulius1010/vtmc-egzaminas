import React, { useState, useEffect } from "react";
import "./IncomeAndExpense.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthService from "../services/auth.service";
import { useForm } from "react-hook-form";
import EditDishModal from "./EditDishModal";
import DeleteModal from "./DeleteModal";
import Table from "react-bootstrap/Table";
import Accordion from 'react-bootstrap/Accordion'


export default function Books() {
  const [allMenus, setAllMenus] = useState([]);
  const [allDishes, setAllDishes] = useState([]);
  const [forceRender, setForceRender] = useState(false);
  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const currentUser = AuthService.getCurrentUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onSubmit", reValidateMode: "onSubmit" });


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8080/api/categories/all`,
      {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.accessToken}`
        }
      });
      const data = await response.json();
      setAllMenus(data);
    };
    fetchData();
  }, [forceRender]);

  const onSubmit = async (data) => {
    const response = await fetch("http://localhost:8080/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
      body: JSON.stringify({
        name: data.bookName,
        description: data.bookDescription,
        isbn: data.bookIsbn,
        coverLink: data.bookCoverLink,
        pages: data.bookPages,
        categoryId: data.bookCategoryId,
      }),
    });

    if (response.status === 200) {
      successMessage("Pridėta");
      reset();
    } else {
      errorMessage("Klaida!");
    }
    setForceRender(!forceRender);
  };

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

  const removeDish = async (id) => {
    const response = await fetch(`http://localhost:8080/api/books/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
    });

    if (response.status === 200) {
      successMessage("Ištrinta");
    } else {
      errorMessage("Klaida!");
    }

    setForceRender(!forceRender);
    setDisplayDeleteModal(false);
  };

  const showDeleteModal = (id) => {
    setDisplayDeleteModal(true);
    setDeleteId(id);
  };

  const hideDeleteModal = () => {
    setDisplayDeleteModal(false);
  };


  const dishesSum = allDishes.reduce((n) => n + 1, 0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:8080/api/books/all`,
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
              <h2>Patiekalų skaičius: {dishesSum} </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="bottom ">
        <div className="container">
          <div >
            <Accordion defaultActiveKey="0" >
              <Accordion.Item eventKey="0" >
                <Accordion.Header >Naujas įrašas</Accordion.Header>
                <Accordion.Body >
                  <div className="add">
                    <div className="row text-center add__container">
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="col-12 col-sm-6 col-md-6 col-lg-6 input-group my-3"
                      >

                        <select
                          {...register("bookCategoryId", {
                            required: true,
                          })}
                          className="form-control add__description"
                          type="text"
                        >
                          <option value={""}>--Pasirinkite kategoriją--</option>
                          {allMenus.map((option) => (
                            <option value={option.id}>{option.name}</option>
                          ))}
                        </select>


                        <input
                          {...register("bookName", { required: true, minLength: 3, maxLength: 20 })}
                          type="text"
                          className="form-control add__description"
                          placeholder="Pavadinimas"
                        />

                        <input
                          {...register("bookDescription", { required: true, minLength: 3, maxLength: 20 })}
                          type="text"
                          className="form-control add__description"
                          placeholder="Apibūdinimas"
                        />
                        <input
                          {...register("bookIsbn", { required: true, minLength: 3, maxLength: 20 })}
                          type="text"
                          className="form-control add__description"
                          placeholder="ISBN"
                        />
                        <input
                          {...register("bookCoverLink", { required: true, minLength: 3, maxLength: 20 })}
                          type="text"
                          className="form-control add__description"
                          placeholder="Nuotraukos internetinis adresas"
                        />
                        <input
                          {...register("bookPages", {
                            required: true,
                            min: 1,
                          })}
                          type="number"
                          className="form-control add__value"
                          placeholder="Puslapių skaičius"
                          step="1"
                        />



                        <div className="input-group-append">
                          <button className="btn" type="submit">
                            <FontAwesomeIcon
                              icon={faCirclePlus}
                              className="add__btn__expense"
                            />
                          </button>
                        </div>
                      </form>
                    </div>
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
            {/* <h2 className="expense__title">Išlaidos</h2> */}
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
                          {/* <EditDishModal
                            id={dish.id}
                            restaurantId={dish.restaurantId}
                            menuId={dish.menuId}
                            dishName={dish.name}
                            dishDescription={dish.description}
                            dishPrice={dish.price}
                            dishTime={dish.preparationTimeInMinutes}
                            forceRender={forceRender}
                            setForceRender={setForceRender}
                            allMenus={allMenus}
                            /> */}

                          <button
                            onClick={() => showDeleteModal(dish.id)}
                            className="btn"
                            type="button"
                            style={{ paddingTop: 0, paddingBottom: 10 }}
                          >
                            <FontAwesomeIcon
                              icon="trash"
                              className="add__btn__expense"
                              style={{ width: "20px" }}
                            />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <DeleteModal
                  showModal={displayDeleteModal}
                  hideModal={hideDeleteModal}
                  confirmModal={removeDish}
                  id={deleteId}
                />
              </Table>
            </div>

          </div>


        </div>
      </div>
    </>
  );
}
