// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.3.0
// - protoc             v4.25.3
// source: auth.proto

package auth_grpc

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

const (
	AuthServer_Auth_FullMethodName    = "/auth.AuthServer/Auth"
	AuthServer_Refresh_FullMethodName = "/auth.AuthServer/Refresh"
)

// AuthServerClient is the client API for AuthServer service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type AuthServerClient interface {
	Auth(ctx context.Context, in *AuthToken, opts ...grpc.CallOption) (*AuthResult, error)
	Refresh(ctx context.Context, in *AuthToken, opts ...grpc.CallOption) (*RefreshResult, error)
}

type authServerClient struct {
	cc grpc.ClientConnInterface
}

func NewAuthServerClient(cc grpc.ClientConnInterface) AuthServerClient {
	return &authServerClient{cc}
}

func (c *authServerClient) Auth(ctx context.Context, in *AuthToken, opts ...grpc.CallOption) (*AuthResult, error) {
	out := new(AuthResult)
	err := c.cc.Invoke(ctx, AuthServer_Auth_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *authServerClient) Refresh(ctx context.Context, in *AuthToken, opts ...grpc.CallOption) (*RefreshResult, error) {
	out := new(RefreshResult)
	err := c.cc.Invoke(ctx, AuthServer_Refresh_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// AuthServerServer is the server API for AuthServer service.
// All implementations should embed UnimplementedAuthServerServer
// for forward compatibility
type AuthServerServer interface {
	Auth(context.Context, *AuthToken) (*AuthResult, error)
	Refresh(context.Context, *AuthToken) (*RefreshResult, error)
}

// UnimplementedAuthServerServer should be embedded to have forward compatible implementations.
type UnimplementedAuthServerServer struct {
}

func (UnimplementedAuthServerServer) Auth(context.Context, *AuthToken) (*AuthResult, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Auth not implemented")
}
func (UnimplementedAuthServerServer) Refresh(context.Context, *AuthToken) (*RefreshResult, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Refresh not implemented")
}

// UnsafeAuthServerServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to AuthServerServer will
// result in compilation errors.
type UnsafeAuthServerServer interface {
	mustEmbedUnimplementedAuthServerServer()
}

func RegisterAuthServerServer(s grpc.ServiceRegistrar, srv AuthServerServer) {
	s.RegisterService(&AuthServer_ServiceDesc, srv)
}

func _AuthServer_Auth_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(AuthToken)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(AuthServerServer).Auth(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: AuthServer_Auth_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(AuthServerServer).Auth(ctx, req.(*AuthToken))
	}
	return interceptor(ctx, in, info, handler)
}

func _AuthServer_Refresh_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(AuthToken)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(AuthServerServer).Refresh(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: AuthServer_Refresh_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(AuthServerServer).Refresh(ctx, req.(*AuthToken))
	}
	return interceptor(ctx, in, info, handler)
}

// AuthServer_ServiceDesc is the grpc.ServiceDesc for AuthServer service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var AuthServer_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "auth.AuthServer",
	HandlerType: (*AuthServerServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "Auth",
			Handler:    _AuthServer_Auth_Handler,
		},
		{
			MethodName: "Refresh",
			Handler:    _AuthServer_Refresh_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "auth.proto",
}
