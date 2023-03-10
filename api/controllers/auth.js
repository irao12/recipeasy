const router = require("express").Router();
const { user: User, ingredientList: IngredientList } = require("../models");
const passport = require("../middlewares/authentication");

// url: /api/auth/signup
router.post("/signup", (req, res) => {
	console.log("POST body: ", req.body);
	User.create({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		password: req.body.password,
	})
		.then((user) => {
			//save user to database.
			user.createIngredientList();
			req.login(user, () => res.status(201).json(user));
		})
		.catch((error) => {
			res.status(400).json({ msg: "Failed Signup".error });
		});
});

// url: /api/auth/login
// router.Method(URL, RouteHandlerFunction1, RHFunc2)
router.post("/login", passport.authenticate("local"), (req, res) => {
	//if this function gets called, authentication was successful.
	// `req.user` contains the authenticated user.
	res.json(req.user);
});

router.get("/login", (req, res) => {
	if (req.user) {
		res.json(req.user);
	} else {
		res.sendStatus(401);
	}
});

router.post("/logout", (req, res, next) => {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		res.status(200).json({ message: "Logout successfully!" });
	});
});

module.exports = router;
