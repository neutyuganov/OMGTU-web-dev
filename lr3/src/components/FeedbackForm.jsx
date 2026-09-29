// src/components/FeedbackForm.jsx

import { useState } from "react";
import "./FeedbackForm.css";

function FeedbackForm() {
  // --- Состояние значений полей ---
  // Каждый инпут — управляемый компонент: его значение хранится в state.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // --- Состояние ошибок валидации ---
  // Храним текст ошибки для каждого поля отдельно.
  // Если ошибки нет — значение null.
  const [errors, setErrors] = useState({
    name: null,
    email: null,
    message: null,
  });

  // --- Состояние «тронутых» полей ---
  // Поле считается «тронутым» (touched), если пользователь хотя бы раз
  // вышел из него (blur). До этого момента не показываем ошибки,
  // даже если значение невалидно — это снижает раздражение пользователя.
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });

  // --- Состояние процесса отправки ---
  // Пока идёт «запрос» — блокируем кнопку и показываем индикатор.
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Состояние успешной отправки ---
  // После успешной отправки показываем сообщение вместо формы.
  const [submitted, setSubmitted] = useState(false);

  // --- Функции валидации ---
  // Имя: минимум 2 символа, только буквы, пробелы и дефис.
  const validateName = (value) => {
    if (!value.trim()) return "Имя обязательно для заполнения";
    if (value.trim().length < 2) return "Минимум 2 символа";
    if (!/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(value.trim()))
      return "Только буквы, пробелы и дефис";
    return null; // нет ошибки
  };

  // Email: проверка через регулярное выражение.
  const validateEmail = (value) => {
    if (!value.trim()) return "Email обязателен для заполнения";
    // Простая, но достаточно надёжная проверка формата.
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
      return "Некорректный формат email";
    return null;
  };

  // Сообщение: минимум 10 символов.
  const validateMessage = (value) => {
    if (!value.trim()) return "Сообщение обязательно для заполнения";
    if (value.trim().length < 10)
      return "Минимум 10 символов";
    return null;
  };

  // Универсальный объект валидаторов — удобно перебирать в цикле.
  const validators = {
    name: validateName,
    email: validateEmail,
    message: validateMessage,
  };

  // Обработчик изменения поля.
  // Принимает имя поля и новое значение, проверяет и обновляет состояние.
  const handleChange = (field, value) => {
    // Обновляем значение соответствующего поля через switch.
    switch (field) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "message":
        setMessage(value);
        break;
      // no default
    }

    // Если поле уже тронуто — сразу валидируем при наборе.
    // Если нет — не показываем ошибки, пока пользователь не уйдёт из поля.
    if (touched[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: validators[field](value),
      }));
    }
  };

  // Обработчик потери фокуса.
  const handleBlur = (field) => {
    // Помечаем поле как тронутое.
    setTouched((prev) => ({ ...prev, [field]: true }));

    // Получаем текущее значение поля.
    const currentValue =
      field === "name" ? name : field === "email" ? email : message;

    // Валидируем и записываем результат.
    setErrors((prev) => ({
      ...prev,
      [field]: validators[field](currentValue),
    }));
  };

  // Обработчик отправки формы.
  const handleSubmit = (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы.

    // 1. Валидируем все поля сразу.
    const newErrors = {
      name: validateName(name),
      email: validateEmail(email),
      message: validateMessage(message),
    };

    // 2. Записываем ошибки и помечаем все поля как тронутые.
    setErrors(newErrors);
    setTouched({ name: true, email: true, message: true });

    // 3. Если хотя бы одна ошибка есть — не отправляем.
    if (Object.values(newErrors).some((err) => err !== null)) {
      return; // Прерываем отправку.
    }

    // 4. Имитируем отправку на сервер.
    setIsSubmitting(true);
    // setTimeout имитирует сетевой запрос с задержкой 1.5 секунды.
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      // В реальном проекте здесь был бы fetch / axios:
      // fetch("/api/feedback", { method: "POST", body: ... })
    }, 1500);
  };

  // Возвращает строку классов для инпута в зависимости от состояния.
  const getInputClass = (field) => {
    // Базовый класс
    const classes = ["field__input"];
    // Если поле тронуто и есть ошибка — добавляем класс ошибки.
    if (touched[field] && errors[field]) {
      classes.push("field__input--error");
    }
    // Если поле тронуто и ошибки нет — добавляем класс успеха.
    else if (touched[field] && !errors[field]) {
      classes.push("field__input--valid");
    }
    // Для textarea добавляем отдельный класс.
    if (field === "message") {
      classes.push("field__input--textarea");
    }
    return classes.join(" ");
  };

  // Если форма успешно отправлена — показываем благодарность.
  if (submitted) {
    return (
      <div className="feedback-form feedback-form--success">
        <h2 className="feedback-form__title">Спасибо за обращение!</h2>
        <p className="feedback-form__text">
          Мы свяжемся с вами в ближайшее время.
        </p>
        <button
          type="button"
          className="feedback-form__submit"
          onClick={() => {
            // Сбрасываем форму к начальному состоянию.
            setName("");
            setEmail("");
            setMessage("");
            setErrors({ name: null, email: null, message: null });
            setTouched({ name: false, email: false, message: false });
            setSubmitted(false);
          }}
        >
          Отправить ещё одно сообщение
        </button>
      </div>
    );
  }

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      {/* Поле «Имя» */}
      <div className="field">
        <label htmlFor="name" className="field__label">
          Имя
        </label>
        <input
          id="name"
          type="text"
          className={getInputClass("name")}
          value={name}
          onChange={(e) => handleChange("name", e.target.value)}
          onBlur={() => handleBlur("name")}
        />
        {/* Блок ошибки появляется только если поле тронуто И есть ошибка */}
        {touched.name && errors.name && (
          <span className="field__error">{errors.name}</span>
        )}
      </div>

      {/* Поле «Email» */}
      <div className="field">
        <label htmlFor="email" className="field__label">
          Email
        </label>
        <input
          id="email"
          type="email"
          className={getInputClass("email")}
          value={email}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={() => handleBlur("email")}
        />
        {touched.email && errors.email && (
          <span className="field__error">{errors.email}</span>
        )}
      </div>

      {/* Поле «Сообщение» */}
      <div className="field">
        <label htmlFor="message" className="field__label">
          Сообщение
        </label>
        <textarea
          id="message"
          className={getInputClass("message")}
          value={message}
          onChange={(e) => handleChange("message", e.target.value)}
          onBlur={() => handleBlur("message")}
          rows={5}
        />
        {touched.message && errors.message && (
          <span className="field__error">{errors.message}</span>
        )}
      </div>

      <button
        type="submit"
        className="feedback-form__submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Отправка…" : "Отправить"}
      </button>
    </form>
  );
}

export default FeedbackForm;
