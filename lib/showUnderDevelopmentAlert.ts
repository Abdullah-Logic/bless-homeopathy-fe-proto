"use client";

import Swal from "sweetalert2";

const showUnderDevelopmentAlert = () =>
  Swal.fire({
    title: "Under Development",
    text: "This feature is currently under development.",
    icon: "info",
    confirmButtonText: "Okay",
    background: "#ffffff",
    color: "#1e3d52",
    confirmButtonColor: "#E12454",
  });

export default showUnderDevelopmentAlert;
