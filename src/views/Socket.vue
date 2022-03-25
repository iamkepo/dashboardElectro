<template>
  <dashboard-layout title="Socket">
    <div class="container-fluid">
      <div class="row">
        <form @submit="create">
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              v-model="msg.test1"
              required
              placeholder="message..."
            />
          </div>
          <div class="form-group">
            <input
              type="submit"
              class="btn btn-primary btn-block"
              style="background-color:#d39b03"
              value="envoyer"
            />
          </div>
        </form>
      </div>
    </div>
  </dashboard-layout>
</template>

<script>
export default {
  name: "Socket",

  data() {
    return {
      msg: {
        test1: "",
      },
    };
  },
  mounted() {},
  methods: {
    init() {},
    create(e) {
      e.preventDefault();
      let socket = io("ws://192.168.0.104:6363");

      try {
        socket.emit("chat message", this.msg);
      } catch (error) {
        console.log("erreur socket", error);
      }
      console.log("ook");
    },
  },
};
</script>