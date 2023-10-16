import { describe, it } from 'node:test';
import { deepStrictEqual, strictEqual } from 'node:assert';
import { instituitionToken, leaderToken, pupilToken } from './tokens.js';

let id;

describe("studentService test Suite (GET METHOD)", () => {
  /**
   * We're testing here the GET method
   */
  it('should receive error 401 when not logged in', async () => {
    const request = await fetch('http://127.0.0.1:3001/student/', {
      method: 'GET',
    });
    strictEqual(request.status, 401);
    const response = await request.json();
    deepStrictEqual(response, { errors: ['Faça login para continuar'] });
  });
  it('should receive error 401 when user dont have role enough', async () => {
    const request = await fetch('http://127.0.0.1:3001/student/', {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${pupilToken}`,
      },
    });
    strictEqual(request.status, 401);
    const response = await request.json();
    deepStrictEqual(response, 'Invalid permission');
  });
  it('should receive success when a instituition try to access', async () => {
    const request = await fetch('http://127.0.0.1:3001/student/', {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${instituitionToken}`,
      },
    });
    strictEqual(request.status, 200);
    const response = await request.json();
    deepStrictEqual(true, Array.isArray(response));
  });
  it('should receive success and only students of the your class when you are a Leader', async () => {
    const leaderRoomId = 1;
    const request = await fetch('http://127.0.0.1:3001/student/', {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${leaderToken}`,
      },
    });
    strictEqual(request.status, 200);
    const response = await request.json();
    response.forEach((student) => {
      strictEqual(student.id, leaderRoomId);
    });
  });
});

describe("studentService test suite (POST METHOD)", () => {
  /**
   * We're testing here the POST method
   */
  it('should receive error 401 when not logged in', async () => {
    const request = await fetch('http://127.0.0.1:3001/student/', {
      method: 'GET',
    });
    strictEqual(request.status, 401);
    const response = await request.json();
    deepStrictEqual(response, { errors: ['Faça login para continuar'] });
  });

  it('should receive error 401 when user dont have role enough', async () => {
    const request = await fetch('http://127.0.0.1:3001/student/', {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${pupilToken}`,
      },
    });
    strictEqual(request.status, 401);
    const response = await request.json();
    deepStrictEqual(response, 'Invalid permission');
  });

  it('should receive error whent student already exist', async () => {
    const body = {
      name: "Anderson de Oliveira Alcântara Júnior",
      room_id: 1,
    };
    const request1 = await fetch('http://127.0.0.1:3001/student/', {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${leaderToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const request = await fetch('http://127.0.0.1:3001/student/', {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${leaderToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const response = await request.json();
    strictEqual(request.status, 400);
    deepStrictEqual({ error: true, msg: 'Student already exist' }, response);
  });
  it('should receive success', async () => {
    const body = {
      name: "Dudu",
      room_id: 2,
    };
    const request = await fetch('http://127.0.0.1:3001/student/', {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${leaderToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const response = await request.json();

    strictEqual(request.status, 201);

    deepStrictEqual({ success: true, msg: 'Successfully created' }, response);
  });
});

describe("studentService test suite (PUT METHOD)", () => {
  const body = { name: 'New Name' };
  it("Should return success when try to update a user", async () => {
    const users = await fetch('http://127.0.0.1:3001/student/', {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${leaderToken}`,
      },
    });
    id = await users.json();
    if (id.length > 0) {
      id = id[0].id;
      const request = await fetch(`http://127.0.0.1:3001/student/${id}`, {
        method: 'PUT',
        headers: {
          "Authorization": `Bearer ${leaderToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      strictEqual(request.status, 204);
    }
  });
  it("Should return a error when you do not sent a body", async () => {
    const users = await fetch('http://127.0.0.1:3001/student/', {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${leaderToken}`,
      },
    });
    id = await users.json();
    if (id.length > 0) {
      id = id[0].id;
      const request = await fetch(`http://127.0.0.1:3001/student/${id}`, {
        method: 'PUT',
        headers: {
          "Authorization": `Bearer ${leaderToken}`,
          "Content-Type": "application/json",
        },
      });
      strictEqual(request.status, 400);
    }
  });
  it("Should return a error when student do not exist", async () => {
    const users = await fetch('http://127.0.0.1:3001/student/', {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${leaderToken}`,
      },
    });
    id = await users.json();
    if (id.length > 0) {
      id = id[0].id;
      const request = await fetch(`http://127.0.0.1:3001/student/${id - 1}`, {
        method: 'PUT',
        headers: {
          "Authorization": `Bearer ${leaderToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      strictEqual(request.status, 404);
    }
  });
});
describe("studentService test suite (DELETE METHOD)", () => {
  it("Should return a error when user do not exist", async () => {
    const request = await fetch(`http://127.0.0.1:3001/student/${id - 1}`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${leaderToken}`,
        "Content-Type": "application/json",
      },
    });
    strictEqual(request.status, 404);
  });
  it("Should return success when try to delete a student", async () => {
    const request = await fetch(`http://127.0.0.1:3001/student/${id}`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${leaderToken}`,
        "Content-Type": "application/json",
      },
    });
    strictEqual(request.status, 204);
  });
});
