import AddProductForm from "../components/Admin/AddProductForm";

const Admin = () => {
    return (
        <section className="admin">
            <div className="admin-inner">
                <div className="admin__title">
                    <h1>Add new Product</h1>
                </div>
                <div className="admin__context">
                    <AddProductForm />
                </div>
            </div>
        </section>
    );
};

export default Admin;
