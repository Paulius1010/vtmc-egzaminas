import React from "react";
import "./Home.css"

const Home = () => {
    return (
        <>

            <div className="container mt-custom box-shadow bg-white">
                <div className="row">
                    <div className="">
                        <div className="col-11 col-md-11 bg-white second_section container">
                            <div className="row">
                                <div className="row ss_header">
                                    <div className="col-12">
                                        <div>Tai yra knygų rezervavimo aplikacija</div>
                                    </div>

                                </div>
                                <div className="row ss_content">
                                    <div className="col-12">
                                        <div>Prisijunkite ir rinkitės knygas</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="container">
                        <div className="col-11 col-md-11 bg-white third_section container">
                            <div className="row">
                                <div className="col-12 ss_header">Jei neturite paskyros, užsiregistruokite</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};
export default Home;
