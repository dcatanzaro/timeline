## GalioPay

Fines del 2023 empezamos a tramitar las licencias de PSP y agrupadores de pagos con el Banco Central de Argentina porque queríamos poder dar un salto con Cafecito: procesar nosotros los pagos, poder procesar pagos internacionalmente. Y después de mucha lucha, burocracia y abogados, en el 2025 logramos conseguir las 2 licencias que necesitábamos.

{{gallery:galiopay_logo.png}}

Empezamos a desarrollar GalioPay, un procesador de pagos orientado a desarrolladores, originalmente apuntado solo a que funcione con Cafecito, pero apunté a programarlo un poco más abierto para que, en un futuro, cualquiera se pueda integrar.

Nos integramos con un banco de Argentina que nos proporciona la creación de CVUs y con un proveedor de pagos de tarjeta de crédito y débito. En julio del 2025 salimos con la primera versión de GalioPay integrada a Cafecito y fue un éxito, salvo un detalle: el fraude.

Un gran problema que tienen las tarjetas de crédito es que son el sistema más arcaico posible y mal diseñado del planeta. Una tarjeta tiene todos los datos en el plástico y cualquiera con ese plástico puede hacer un pago sin ser dueña de la misma. Un sistema que está diseñado así porque los contracargos se cobran y es un negocio. Y eso nos pasó: nos empezaron a llegar muchísimos contracargos de los cuales no pudimos hacer absolutamente nada. En septiembre, solo 2 meses después de prender, decidimos apagar porque ya estábamos varios **millones de pesos en negativo** gracias a estos contracargos.

Buscando qué hacer para no perder las licencias que tanto nos costaron sacar, a Juani se le ocurre la idea de hacer pagos con transferencias, pagando a CVUs que nosotros creamos y asignamos. Y así fue: rehícimos el sistema para que funcione para pagar con un CVU, lo integramos y fue un éxito completo. Pagos inmediatos, más baratos y sin fraude.

GalioPay ya tiene varios meses de vida y lleva procesados más de **100.000 pagos** en 3 meses.

{{gallery:galiopay.png}}
