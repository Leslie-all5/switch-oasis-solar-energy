// LOGIN ROUTE
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid Credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.status(200).json({ 
        message: "Login successful",
        token,
        user: { email: user.email, username: user.username }
      });
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' }); // 💡 Send JSON here too
  }
});

module.exports = router;