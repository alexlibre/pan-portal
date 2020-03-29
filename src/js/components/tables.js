import dt from "datatables.net";
import responsive from "datatables.net-responsive";
import "datatables.net-dt/css/jquery.datatables.css";
import "datatables.net-responsive-dt/css/responsive.dataTables.css";

const initTables = () => {
  const initOrdersTable = () => {
    const table = $("#orders-table");
    if (!table) return;

    const tbody = $("#orders-table tbody");
    const dt = table.DataTable({
      paging: false,
      info: false,
      searching: false,
      stripe: false,
      responsive: {
        details: {
          type: "column",
          target: "tr"
        }
      },
      columnDefs: [
        {
          className: "control",
          orderable: false,
          targets: 0
        },
        {
          orderable: false,
          targets: [1, -1]
        },
        {
          responsivePriority: 100,
          targets: [1, 2, 3, 5]
        },
        {
          responsivePriority: 1,
          targets: [7, -1]
        }
      ],
      stripeClasses: "",
      order: []
    });

    tbody.on("click", ".dt__more-delete", function() {
      dt.row($(this).parents("tr"))
        .remove()
        .draw();
    });

    tbody.on("click", ".form__item, a", event => {
      event.stopPropagation();
    });

    tbody.on("click", "tr", function(event) {
      if (event.target.classList.contains("control")) return;
      let href = this.dataset.href;
      if (href) window.location.href = href;
    });
  };

  const initApplicationsTable = () => {
    const table = $("#applications-table");
    if (!table) return;

    const tbody = $("#applications-table tbody");
    const filters = {};

    const dt = table.DataTable({
      paging: false,
      info: false,
      searching: true,
      sDom: "t",
      stripe: false,
      responsive: {
        details: {
          type: "column",
          target: "tr"
        }
      },
      columnDefs: [
        {
          orderable: false,
          targets: [0, 1, -1]
        },
        {
          searchable: false,
          targets: [0, 2, 3, 4, 6, 7]
        },
        {
          responsivePriority: 100,
          targets: [1, 2, 7, -1]
        }
      ],
      stripeClasses: "",
      order: [],
      language: {
        emptyTable: "Нет записей",
        zeroRecords: "Ничего не найдено"
      }
    });

    const initEvents = () => {
      $(".orders__control").on("change", function() {
        let attr = this.name.split(" ")[0];
        let value = this.name.split(" ")[1];
        if (!filters[attr]) {
          filters[attr] = [value];
        } else {
          if (this.checked) {
            filters[attr].push(value);
          } else {
            let index = filters[attr].indexOf(value);
            filters[attr].splice(index, 1);
          }
        }
  
        dt.draw();
      });
  
      $("#applications-search").on("keyup input", function() {
        dt.search(this.value).draw();
      });
  
      tbody.on("click", ".dt__more-delete", function() {
        dt.row($(this).parents("tr"))
          .remove()
          .draw();
      });
  
      tbody.on("click", ".form__item, a", event => {
        event.stopPropagation();
      });
  
      tbody.on("click", "tr", function(event) {
        if (event.target.classList.contains("control")) return;
        let href = this.dataset.href;
        if (href) window.location.href = href;
      });
    };

    const initFilter = () => {
      $.fn.dataTable.ext.search.push((settings, data, dataIndex) => {
        const nodes = dt
          .row(dataIndex) //get the row to evaluate
          .nodes() //extract the HTML - node() does not support to$
          .to$(); //get as jQuery object
  
        let passing = true;
  
        for (let key in filters) {
          if (!filters[key] || !filters[key].length) continue;
  
          const id = nodes.find(`td[data-${key}]`).data(key);
          passing = filters[key].includes(`${id}`);
          if (!passing) break;
        }
  
        return passing;
      });
    };

    initEvents();
    initFilter();
  };

  const initComplexTables = () => {
    const complexTables = $(".complex__table");
    if (!complexTables.length) return;

    const complexBodies = $(".complex__table tbody");
    complexTables.DataTable({
      paging: false,
      info: false,
      searching: false,
      responsive: {
        details: {
          type: "column",
          target: "tr"
        }
      },
      columnDefs: [
        {
          className: "control",
          orderable: false,
          targets: 0
        },
        {
          orderable: false,
          targets: 1
        },
        {
          responsivePriority: 1,
          targets: [1, 2, 5, 6, 8, -1]
        },
        {
          responsivePriority: 10,
          targets: [3]
        }
      ],
      stripeClasses: "",
      order: []
    });

    complexBodies.on("click", ".complex__table-status .info", event => {
      event.stopPropagation();
    });
  };

  $(document).ready(function() {
    initComplexTables();
    initOrdersTable();
    initApplicationsTable();
  });
};

export default initTables;
