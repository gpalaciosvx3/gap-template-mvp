Feature: Autentificación - Login

  Scenario Outline: Al ejecutar login con credenciales inválidas
    Given Ingresamos un payload <input> <casuistica>
    When Ejecutamos el caso de uso
    Then Se mostrará respuesta <resultado> <casuistica>

    Examples:
      | input         | casuistica       | resultado               |
      | login-payload | INVALID_EMAIL    | login-error-response    |
      | login-payload | INVALID_PASSWORD | login-error-response    |

  Scenario Outline: Al ingresar credenciales correctas se devuelve un token
    Given Ingresamos un payload <input> <casuistica>
    And Mockeamos dependencias <mockData> <casuistica>
    When Ejecutamos el caso de uso
    Then Se mostrará respuesta <resultado> <casuistica>

    Examples:
      | input         | mockData   | casuistica | resultado              |
      | login-payload | login-mock | EXITOSO    | login-success-response | 