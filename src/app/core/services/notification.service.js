import { Button } from 'primereact/button';

export const showMessage = (toast, severity, summary, detail) => {
  toast.current.show({
    severity: severity,
    summary: summary,
    detail: detail,
    life: 3000
  });
};

export const showConfirm = (toast) => {
  toast.current.show({
    severity: 'warn',
    sticky: true,
    content: (
      <div className='p-flex p-flex-column' style={{ flex: '1' }}>
        <div className='p-text-center'>
          <i
            className='pi pi-exclamation-triangle'
            style={{ fontSize: '3rem' }}
          ></i>
          <h4>Are you sure?</h4>
          <p>Confirm to proceed</p>
        </div>
        <div className='p-grid p-fluid'>
          <div className='p-col-6'>
            <Button type='button' label='Yes' className='p-button-success' />
          </div>
          <div className='p-col-6'>
            <Button type='button' label='No' className='p-button-secondary' />
          </div>
        </div>
      </div>
    )
  });
};
