export default {
  admin: [
    {
      label: "Admins",
      key: "admins",
      value: 0,
      icon: "users",
      options: {
        level: 'admin'
      },
      filterKey: "createdAt",
    },
    {
      label: "Taxis",
      key: "taxis",
      value: 0,
      icon: "list",
      filterKey: "createdAt"
    },
    {
      label: "Courses",
      key: "courses",
      value: 0,
      icon: "list",
      filterKey: "createdAt"
    }
  ]
}