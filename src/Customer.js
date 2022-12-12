import { useEffect, useState } from "react";
import {
  Avatar,
  Breadcrumb,
  Button,
  Layout,
  List,
  Skeleton,
  Space,
  Typography,
} from "antd";
import {
  ArrowLeftOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { fetchData } from "./service";

const RestaurantList = ({ navigateToMenuPage }) => {
  const [loading, setLoading] = useState(false);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchData("stub/restaurants.json")
      .then((response) => {
        setLoading(false);
        setRestaurants(response);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  return (
    <>
      <List
        style={{ textAlign: "left" }}
        header={<MenuHeader title="Restaurants" />}
        itemLayout="horizontal"
        dataSource={restaurants}
        bordered
        renderItem={(item) => (
          <List.Item
            onClick={() => {
              navigateToMenuPage(item.id);
            }}
            style={{ cursor: "pointer" }}
          >
            <Skeleton title={false} loading={loading}>
              <List.Item.Meta
                avatar={<Avatar />}
                title={item.name}
                description={item.description}
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </>
  );
};

const MenuHeader = ({ title, onBack }) => {
  return (
    <Space>
      {onBack ? (
        <Button
          onClick={() => {
            onBack();
          }}
          type="secondary"
          shape="circle"
          icon={<ArrowLeftOutlined />}
        ></Button>
      ) : null}

      <Typography.Text>{title}</Typography.Text>
    </Space>
  );
};

const RestaurantMenu = ({ restaurantId, onBack }) => {
  const [loading, setLoading] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [order, setOrder] = useState({ orderItems: [] });

  const placeOrder = () => {
    console.log(order);
  };

  const addItemToOrder = (item, quantity = 1) => {
    const oldOrderItems = order.orderItems;
    let newOrderItems;
    if (oldOrderItems.map((_item) => _item.id).includes(item.id)) {
      newOrderItems = oldOrderItems.map((_i) => {
        if (_i.id === item.id) {
          return {
            ..._i,
            quantity: _i.quantity + quantity,
          };
        } else {
          return _i;
        }
      });
    } else {
      newOrderItems = [...oldOrderItems, { ...item, quantity }];
    }

    setOrder((order) => ({
      fromRestaurantId: restaurantId,
      orderItems: newOrderItems,
    }));
  };

  const removeItemFromOrder = (item, quantity = 1) => {
    const oldOrderItems = order.orderItems;

    let index = oldOrderItems.findIndex((_item) => _item.id === item.id);

    if (index + 1 && oldOrderItems[index].quantity > 1) {
      oldOrderItems[index].quantity = oldOrderItems[index].quantity - 1;
    } else {
      oldOrderItems.splice(index, 1);
    }

    setOrder((order) => {
      return oldOrderItems.length !== 0
        ? {
            fromRestaurantId: restaurantId,
            orderItems: oldOrderItems,
          }
        : { orderItems: [] };
    });
  };

  useEffect(() => {
    setLoading(true);
    fetchData(`stub/${restaurantId}.json`).then((response) => {
      setMenuItems(response);
      setLoading(false);
    });
  }, [restaurantId]);
  return (
    <>
      <List
        style={{ textAlign: "left" }}
        bordered
        header={<MenuHeader title="Restaurant Menu" onBack={onBack} />}
        dataSource={menuItems}
        renderItem={(item) => {
          const _actions = (
            <Button.Group>
              <Button
                size="small"
                disabled={order.orderItems.findIndex(
                  (_item) => _item.id === item.id
                )}
                onClick={() => {
                  removeItemFromOrder(item);
                }}
                danger
                icon={<MinusOutlined />}
              ></Button>
              <Button
                size="small"
                onClick={() => {
                  addItemToOrder(item);
                }}
                icon={<PlusOutlined />}
              ></Button>
            </Button.Group>
          );

          return (
            <List.Item actions={[_actions]}>
              <Skeleton title={false} loading={loading}>
                <List.Item.Meta
                  title={item.title}
                  description={item.description}
                ></List.Item.Meta>
              </Skeleton>
            </List.Item>
          );
        }}
      />
      {order.fromRestaurantId ? (
        <List
          style={{ marginTop: "12px", textAlign: "left" }}
          bordered
          dataSource={order.orderItems}
          header={"Order"}
          renderItem={(orderItem) => {
            return (
              <List.Item>
                {orderItem.title} x {orderItem.quantity}
              </List.Item>
            );
          }}
          footer={
            <Button
              block
              type="primary"
              style={{ marginTop: "6px" }}
              onClick={placeOrder}
            >
              Place order
            </Button>
          }
        ></List>
      ) : null}
    </>
  );
};

export default function Customer() {
  const [routerState, setRouterState] = useState(0);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const navigateToMenuPage = (id) => {
    setRouterState(1);
    setSelectedRestaurant(id);
  };

  return (
    <Layout style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}>
      <Layout.Header>
        <p style={{ color: "white" }}>Customer App</p>
      </Layout.Header>
      <Layout.Content style={{ padding: "6px" }}>
        {routerState === 0 ? (
          <RestaurantList navigateToMenuPage={navigateToMenuPage} />
        ) : routerState === 1 ? (
          <RestaurantMenu
            restaurantId={selectedRestaurant}
            onBack={() => {
              setRouterState(0);
            }}
          />
        ) : null}
      </Layout.Content>
    </Layout>
  );
}
