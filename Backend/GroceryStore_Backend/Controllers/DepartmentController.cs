using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GroceryStore_Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace GroceryStore_Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DepartmentController : Controller
    {
        private readonly IDepartmentService _departmentService;

        public DepartmentController(IDepartmentService departmentService)
        {
            _departmentService = departmentService;
        }

        [HttpGet]
        public async Task<IActionResult> GetDepartmentsAsync()
        {
            var departments = await _departmentService.GetDepartments();
            return Ok(departments);
        }
    }
}