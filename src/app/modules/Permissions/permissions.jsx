import axios from 'axios';

import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import { ProductService } from '../service/ProductService';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import './DataTableDemo.css';

const Permissions = () => {
  let emptyProduct = {
    // id: null,
    permissionName: '',
    description: ''
  };

  const [products, setProducts] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  //const [product, setProduct] = useState(emptyProduct);
  const [product, setProduct] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const [edits, setEdits] = useState(false);
  //   const productService = new ProductService();

  //   useEffect(() => {
  //     productService.getProducts().then((data) => setProducts(data));
  //   }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //   const formatCurrency = (value) => {
  //     return value.toLocaleString('en-US', {
  //       style: 'currency',
  //       currency: 'USD'
  //     });
  //   };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log('data updated', products);
  }, [products]);

  const fetchData = async () => {
    const res = await axios.get('permissions');
    console.log('inp', res?.data);
    setProducts(res?.data?.permissions);
  };

  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const saveProduct = async () => {
    setSubmitted(true);
    if (product?.permissionName?.trim() && edits) {
      //this if loop is necessary so that permission name is not empty and error becomes visble on form
      console.log(product);
      const res = await axios.patch(`permissions/${product?._id}`, {
        permissionName: product?.permissionName,
        description: product?.description
      });
      console.log('res ', res);
      if (res?.data?.errors) {
        if (res?.data?.errors[0]?.msg === 'Permission Already Exists') {
          toast.current.show({
            severity: 'error',
            summary: 'Unsuccessful',
            detail: 'Permission Already Exists',
            life: 3000
          });
          setProductDialog(false);
          setProduct(emptyProduct);
          return;
        }
      }
      if (res) {
        toast.current.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'Permission Updated',
          life: 3000
        });
        let temp = [];
        products.forEach((data) => {
          if (data?._id !== product?._id) {
            temp.push(data);
          } else {
            temp.push(product);
          }
        });
        setProducts(temp);
        setProductDialog(false);
        setProduct(emptyProduct);
        setEdits(false);
      }
    } else if (product?.permissionName?.trim()) {
      //this if loop is necessary so that permission name is not empty and error becomes visble on form
      console.log(product);
      const res = await axios.post('permissions', product);
      //console.log('res ', res?.data?.permission);
      if (res?.data?.errors) {
        if (res?.data?.errors[0]?.msg === 'Permission Already Exists') {
          toast.current.show({
            severity: 'error',
            summary: 'Unsuccessful',
            detail: 'Permission Already Exists',
            life: 3000
          });
          setProductDialog(false);
          setProduct(emptyProduct);
          return;
        }
      }
      if (res) {
        toast.current.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'Permission Created',
          life: 3000
        });
        setProducts([...products, res?.data?.permission]);
        setProductDialog(false);
        setProduct(emptyProduct);
      }
    }

    // if (product.name.trim()) {
    //   let _products = [...products];
    //   let _product = { ...product };
    //   //if (product.id) {
    //   // const index = findIndexById(product.id);

    //   // _products[index] = _product;
    //   toast.current.show({
    //     severity: 'success',
    //     summary: 'Successful',
    //     detail: 'Product Updated',
    //     life: 3000
    //   });
    //   //} else {
    //   // _product.id = createId();
    //   // _product.image = 'product-placeholder.svg';
    //   _products.push(_product);
    //   toast.current.show({
    //     severity: 'success',
    //     summary: 'Successful',
    //     detail: 'Product Created',
    //     life: 3000
    //   });
    //   // }

    // setProducts(product);
    // setProductDialog(false);
    // setProduct(emptyProduct);
    // }
  };

  const editProduct = (product) => {
    setProduct({ ...product });
    setProductDialog(true);
    setEdits(true);
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = () => {
    let id = product?._id;
    const res = axios.delete(`permissions/${id}`);
    console.log('deleted', res);
    if (res) {
      let _products = products.filter((val) => val._id !== product._id);
      setProducts(_products);
      setDeleteProductDialog(false);
      //setProduct(emptyProduct);
      toast.current.show({
        severity: 'success',
        summary: 'Successful',
        detail: 'Permission Deleted',
        life: 3000
      });
    }
  };

  //   const findIndexById = (id) => {
  //     let index = -1;
  //     for (let i = 0; i < products.length; i++) {
  //       if (products[i].id === id) {
  //         index = i;
  //         break;
  //       }
  //     }

  //     return index;
  //   };

  //   const createId = () => {
  //     let id = '';
  //     let chars =
  //       'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //     for (let i = 0; i < 5; i++) {
  //       id += chars.charAt(Math.floor(Math.random() * chars.length));
  //     }
  //     return id;
  //   };

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };

  const deleteSelectedProducts = () => {
    let ids = [];
    selectedProducts?.forEach((data) => {
      ids.push(data?._id);
    });
    // console.log(ids);
    const res = axios.post('deletePermissions', ids);
    console.log('deleted?', res); //check if error comes in here..
    if (res) {
      let _products = products.filter((val) => !selectedProducts.includes(val));
      setProducts(_products);
      setDeleteProductsDialog(false);
      setSelectedProducts(null);
      toast.current.show({
        severity: 'success',
        summary: 'Successful',
        detail: 'Permissions Deleted',
        life: 3000
      });
    }
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _product = { ...product };
    _product[`${name}`] = val;

    setProduct(_product);
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label='New'
          icon='pi pi-plus'
          className='p-button-success mr-2'
          onClick={openNew}
        />
        <Button
          label='Delete'
          icon='pi pi-trash'
          className='p-button-danger'
          onClick={confirmDeleteSelected}
          disabled={!selectedProducts || !selectedProducts.length}
        />
      </React.Fragment>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon='pi pi-pencil'
          className='p-button-rounded p-button-success mr-2'
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon='pi pi-trash'
          className='p-button-rounded p-button-warning'
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className='table-header'>
      <h5 className='mx-0 my-1'>Manage Permissions</h5>
      <span className='p-input-icon-left'>
        <i className='pi pi-search' />
        <InputText
          type='search'
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder='Search...'
        />
      </span>
    </div>
  );
  const productDialogFooter = (
    <React.Fragment>
      <Button
        label='Cancel'
        icon='pi pi-times'
        className='p-button-text'
        onClick={hideDialog}
      />
      <Button
        label='Save'
        icon='pi pi-check'
        className='p-button-text'
        onClick={saveProduct}
      />
    </React.Fragment>
  );
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label='No'
        icon='pi pi-times'
        className='p-button-text'
        onClick={hideDeleteProductDialog}
      />
      <Button
        label='Yes'
        icon='pi pi-check'
        className='p-button-text'
        onClick={deleteProduct}
      />
    </React.Fragment>
  );
  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button
        label='No'
        icon='pi pi-times'
        className='p-button-text'
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label='Yes'
        icon='pi pi-check'
        className='p-button-text'
        onClick={deleteSelectedProducts}
      />
    </React.Fragment>
  );

  return (
    <div className='datatable-crud-demo'>
      <Toast ref={toast} />

      <div className='card'>
        <Toolbar className='mb-4' left={leftToolbarTemplate}></Toolbar>

        <DataTable
          ref={dt}
          value={products}
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          dataKey='_id'
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
          currentPageReportTemplate='Showing {first} to {last} of {totalRecords} products'
          globalFilter={globalFilter}
          header={header}
          responsiveLayout='scroll'
        >
          <Column
            selectionMode='multiple'
            headerStyle={{ width: '3rem' }}
            exportable={false}
          ></Column>
          <Column
            field='permissionName'
            header='Permission Name'
            //sortable
            style={{ minWidth: '16rem' }}
          ></Column>
          <Column
            field='description'
            header='Description'
            //sortable
            style={{ minWidth: '10rem' }}
          ></Column>
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: '8rem' }}
          ></Column>
        </DataTable>
      </div>

      <Dialog
        visible={productDialog}
        style={{ width: '450px' }}
        header='Add New Permission'
        modal
        className='p-fluid'
        footer={productDialogFooter}
        onHide={hideDialog}
      >
        {/* {product.image && (
          <img
            src={`images/product/${product.image}`}
            onError={(e) =>
              (e.target.src =
                'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
            }
            alt={product.image}
            className='product-image block m-auto pb-3'
          />
        )} */}
        <div className='field'>
          <label htmlFor='permissionName'>Permission Name</label>
          <InputText
            id='permissionName'
            value={product.permissionName}
            onChange={(e) => onInputChange(e, 'permissionName')}
            required
            autoFocus
            className={classNames({
              'p-invalid': submitted && !product.permissionName
            })}
          />
          {submitted && !product.permissionName && (
            <small className='p-error'>Permission Name is required.</small>
          )}
        </div>
        <br />
        <div className='field'>
          <label htmlFor='description'>Description</label>
          <InputTextarea
            id='description'
            value={product.description}
            onChange={(e) => onInputChange(e, 'description')}
            required
            rows={3}
            cols={20}
          />
        </div>
      </Dialog>

      <Dialog
        visible={deleteProductDialog}
        style={{ width: '450px' }}
        header='Confirm'
        modal
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
      >
        <div className='confirmation-content'>
          <i
            className='pi pi-exclamation-triangle mr-3'
            style={{ fontSize: '2rem' }}
          />
          {product && (
            <span>
              Are you sure you want to delete <b>{product.permissionName}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteProductsDialog}
        style={{ width: '450px' }}
        header='Confirm'
        modal
        footer={deleteProductsDialogFooter}
        onHide={hideDeleteProductsDialog}
      >
        <div className='confirmation-content'>
          <i
            className='pi pi-exclamation-triangle mr-3'
            style={{ fontSize: '2rem' }}
          />
          {product && (
            <span>
              Are you sure you want to delete the selected permissions?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
};
export default Permissions;
