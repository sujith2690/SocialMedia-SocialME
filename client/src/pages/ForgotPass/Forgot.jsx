import React from 'react'

const Forgot = () => {
    return (
        <div className="Auth">
            <Toaster />
            {/* Left side */}
            <div className="a-left">
                <img src={Logo} alt="" />
                <div className="Webname">
                    <h1>SocialME</h1>
                    <h6>Explore The World Through SocialME</h6>
                </div>
            </div>
            {/* Right Side */}
            <div className="a-right">
                    <form className="infoForm authForm" onSubmit={handleSubmit}>
                        <h3>Forgot Password</h3>
                        <div className="inputfields">
                            <div className="inputname">
                                <input
                                    type="text"
                                    placeholder="Email"
                                    className="infoInput"
                                    name="username"
                                    id="username"
                                    value={values.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.username && touched.username ? (
                                    <span className="form-error">{errors.username}</span>) : null}
                            </div>
                            <button>hai 1</button>
                        </div>
                        <div className="inputfields">
                            <div className="inputname">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="infoInput"
                                    name="password"
                                    id="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.password && touched.password ? (
                                    <span className="form-error">{errors.password}</span>) : null}
                            </div>
                            <button>ahi 2</button>
                        </div>
                        <div>
                            <span style={{ fontSize: '12px', cursor: "pointer" }} onClick={handleLogin}>
                                Don't have an account <b><span style={{ color: 'blue', fontSize: '15px' }}>Sign Up </span></b>

                            </span>
                        </div>
                        <div style={{ fontSize: '12px', marginTop: '-30px', textAlign: 'start', cursor: "pointer" }}>
                            <p onClick={handleForgot}>forgot Password</p>
                        </div>

                        <button className="button infoButton" type="submit" disabled={loading} >
                            {loading ? "Loading..." : 'Sign in'}
                        </button>
                    </form>
            </div>
        </div>
    )
}

export default Forgot