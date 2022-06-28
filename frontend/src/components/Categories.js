import React, { useState, useEffect } from "react";
import "./IncomeAndExpense.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthService from "../services/auth.service";
import { useForm } from "react-hook-form";
import EditMenuModal from "./EditMenuModal";
import DeleteModal from "./DeleteModal";
import Table from "react-bootstrap/Table";

export default function Categories() {
  const [allMenus, setAllMenus] = useState([]);
  const [forceRender, setForceRender] = useState(false);
  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const currentUser = AuthService.getCurrentUser();
  const menusSum = allMenus.reduce((n) => n + 1, 0);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onSubmit", reValidateMode: "onSubmit" });

  const onSubmit = async (data) => {
    const response = await fetch(`http://localhost:8080/api/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
      body: JSON.stringify({
        name: data.name,
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

  const removeMenu = async (id) => {
    const response = await fetch(`http://localhost:8080/api/categories/${id}`, {
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

  return (
    <>
      <div className="container-fluid budget__expense sticky-config">
        <div className="container">
          <div className="row">
            <div className="col">
              <h2>Kategorijų skaičius: {menusSum}</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom ">
        <div className="container">
          <div className="add">
            <div className="row text-center add__container">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="col-12 col-sm-6 col-md-6 col-lg-6 input-group my-3"
              >
                <input
                  {...register("name", { required: true, minLength: 3, maxLength: 20 })}
                  type="text"
                  className="form-control add__description"
                  placeholder="Kategorijos pavadinimas"
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
        </div>

        <div className="container" style={{ paddingRight: 0 }}>
          <div
            className="col-12 expense"
            style={{ paddingLeft: 0, paddingRight: 0 }}
          >
            <div className="expense__list">
              <Table hover>
                <thead>
                  <tr>
                    <th>Kategorijos pavadinimas</th>
                  </tr>
                </thead>
                <tbody>
                  {allMenus.map((menu) => {
                    return (

                      <tr key={menu.id}>
                        <td>{menu.name}&nbsp;</td>

                        <td
                          style={{
                            textAlign: "right",
                            paddingLeft: 0,
                            paddingRight: 0,
                          }}
                        >
                          {/* <EditMenuModal
                            id={menu.id}
                            menuName={menu.name}
                            forceRender={forceRender}
                            setForceRender={setForceRender}
                          /> */}

                          <button
                            onClick={() => showDeleteModal(menu.id)}
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
                {/* <DeleteModal
                  showModal={displayDeleteModal}
                  hideModal={hideDeleteModal}
                  confirmModal={removeMenu}
                  id={deleteId}
                /> */}
              </Table>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
