import React, { useState } from "react";
import { Box, Button, TextField, Typography, CircularProgress, Paper } from "@mui/material";
import axios from "axios";

function QuestionPage() {
  const [topic, setTopic] = useState("");
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchQuestion = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/api/preguntas", {
        tema: topic,
      });
      setQuestion(res.data.pregunta || "No se pudo generar pregunta");
    } catch (err) {
      setQuestion("Error al conectar con el servidor.");
    }
    setLoading(false);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Generador de Preguntas
      </Typography>
      <TextField
        fullWidth
        label="Tema"
        variant="outlined"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" onClick={fetchQuestion} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : "Generar Pregunta"}
      </Button>
      {question && (
        <Paper elevation={3} sx={{ mt: 4, p: 2 }}>
          <Typography variant="h6">Pregunta:</Typography>
          <Typography>{question}</Typography>
        </Paper>
      )}
    </Box>
  );
}

export default QuestionPage;